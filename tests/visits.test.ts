import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/visit/route';
import { sendTelegramMessage } from '../lib/telegram';
import {
  newVisitorMessage,
  parseVisit,
  publicPageLocale,
  referrerOrigin,
  visitorPlace,
  type Visit,
} from '../lib/visits';
import { publishedArticles } from '../content/articles';
const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
const originalRandom = Math.random;
afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...originalEnv };
  Math.random = originalRandom;
});
const sessionId = '6f1c2a3b-4d5e-4f60-8a7b-9c0d1e2f3a4b';
const browser =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const visit: Visit = {
  sessionId,
  path: '/ar/businesses/real-estate',
  locale: 'ar',
  referrer: 'https://www.google.com',
  country: 'TR',
  city: 'Istanbul',
};
function configure({ telegram = true } = {}) {
  delete process.env.POSTGRES_URL;
  delete process.env.VERCEL_ENV;
  process.env.DATABASE_URL = 'postgresql://test:test-only@db.example.test/visits';
  if (telegram)
    Object.assign(process.env, { TELEGRAM_BOT_TOKEN: '123:test-only', TELEGRAM_CHAT_ID: '42' });
  else {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  }
}
function beacon(
  values: Record<string, unknown> = { sessionId, path: '/en/about', locale: 'en', referrer: null },
  headers: Record<string, string> = {},
) {
  return new Request('https://www.byhadara.com/api/visit', {
    method: 'POST',
    headers: {
      origin: 'https://www.byhadara.com',
      'content-type': 'application/json',
      'user-agent': browser,
      'x-vercel-ip-country': 'TR',
      'x-vercel-ip-city': 'Istanbul',
      ...headers,
    },
    body: JSON.stringify(values),
  });
}
/**
 * A stand-in for Neon's HTTP API and Telegram: keeps the visitor_events rows in memory and
 * returns the Telegram messages and SQL statements it received.
 */
function services({ table = true, database = true } = {}) {
  const rows: { session_id: string; values: unknown[] }[] = [];
  const statements: string[] = [];
  const messages: Record<string, unknown>[] = [];
  const result = (fields: string[], data: unknown[][] = []) =>
    Response.json({
      fields: fields.map((name) => ({ name, dataTypeID: 16 })),
      rows: data,
      rowCount: data.length,
      command: 'SELECT',
    });
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.startsWith('https://api.telegram.org/')) {
      messages.push({ url, ...JSON.parse(String(init?.body)) });
      return Response.json({ ok: true });
    }
    if (!database) throw new Error('connect ECONNREFUSED');
    const body = JSON.parse(String(init?.body));
    if (body.queries) {
      statements.push(...body.queries.map((q: { query: string }) => q.query));
      table = true;
      return Response.json({
        results: body.queries.map(() => ({ fields: [], rows: [], rowCount: 0, command: 'CREATE' })),
      });
    }
    statements.push(body.query);
    if (!table)
      return Response.json(
        { message: 'relation "visitor_events" does not exist', code: '42P01' },
        { status: 400 },
      );
    if (body.query.includes('INSERT INTO visitor_events')) {
      const first = !rows.some((r) => r.session_id === body.params[0]);
      // $1 is the session id checked for an earlier event, $2 onwards the inserted row.
      rows.push({ session_id: body.params[1], values: body.params.slice(2) });
      return result(['first'], [[first ? 't' : 'f']]);
    }
    return result([]);
  };
  return { rows, statements, messages };
}
/** Lets work scheduled after the response finish (outside Next.js it runs right away). */
const settle = () => new Promise((resolve) => setTimeout(resolve, 20));
test('only public pages of the website are counted', () => {
  assert.equal(publicPageLocale('/en'), 'en');
  assert.equal(publicPageLocale('/ar/businesses/real-estate'), 'ar');
  assert.equal(publicPageLocale('/tr/contact/thank-you'), 'tr');
  const article = publishedArticles()[0];
  assert.equal(publicPageLocale(`/en/insights/${article.slug}`), 'en');
  for (const path of [
    '/api/visit',
    '/admin',
    '/portal/login',
    '/_next/static/chunk.js',
    '/en/api/visit',
    '/en/admin',
    '/en/not-real',
    '/en/insights/not-published',
    '/de',
    '//en',
    'en/about',
  ])
    assert.equal(publicPageLocale(path), null, path);
});
test('beacons are validated and keep no personal details', () => {
  const headers = new Headers({ 'x-vercel-ip-country': 'sa', 'x-vercel-ip-city': 'Riyadh' });
  assert.deepEqual(
    parseVisit(
      {
        sessionId,
        path: '/ar/contact',
        locale: 'ar',
        referrer: 'https://www.google.com/search?q=private+words',
      },
      headers,
    ),
    {
      sessionId,
      path: '/ar/contact',
      locale: 'ar',
      referrer: 'https://www.google.com',
      country: 'SA',
      city: 'Riyadh',
    },
  );
  const ok = { sessionId, path: '/en', locale: 'en' };
  assert.equal(parseVisit({ ...ok, sessionId: 'not-a-uuid' }, headers), undefined);
  assert.equal(parseVisit({ ...ok, path: 42 }, headers), undefined);
  assert.equal(parseVisit({ ...ok, path: `/en/${'a'.repeat(300)}` }, headers), undefined);
  assert.equal(parseVisit({ ...ok, locale: 'tr' }, headers), undefined);
  assert.equal(parseVisit([ok], headers), undefined);
  assert.equal(parseVisit({ ...ok, path: '/en/admin' }, headers), null);
  assert.equal(referrerOrigin('android-app://com.google.android.gm/'), null);
  assert.equal(referrerOrigin('not a url'), null);
  assert.equal(referrerOrigin(''), null);
});
test('the city header is decoded and the country checked', () => {
  const place = (country: string, city: string) =>
    visitorPlace(new Headers({ 'x-vercel-ip-country': country, 'x-vercel-ip-city': city }));
  assert.deepEqual(place('BR', 'S%C3%A3o%20Paulo'), { country: 'BR', city: 'São Paulo' });
  assert.deepEqual(place('TR', '%E0%A4%A'), { country: 'TR', city: '%E0%A4%A' });
  assert.deepEqual(place('XYZ', ''), { country: null, city: null });
  assert.deepEqual(visitorPlace(new Headers()), { country: null, city: null });
});
test('the alert is in Arabic, starts with the agreed line and escapes every value', () => {
  assert.equal(
    newVisitorMessage(visit),
    [
      '🌐 BYHADARA — زائر جديد',
      '📍 من: Istanbul، تركيا',
      '📄 الصفحة: /ar/businesses/real-estate',
      '🗣 اللغة: العربية',
      '↩️ المصدر: google.com',
    ].join('\n'),
  );
  const direct = newVisitorMessage({
    ...visit,
    referrer: null,
    country: null,
    city: '<b>Town & Co</b>',
  });
  assert.match(direct, /📍 من: &lt;b&gt;Town &amp; Co&lt;\/b&gt;\n/);
  assert.match(direct, /↩️ المصدر: مباشر$/);
  const unknown = newVisitorMessage({ ...visit, locale: 'tr', country: null, city: null });
  assert.match(unknown, /📍 من: غير معروف\n/);
  assert.match(unknown, /🗣 اللغة: التركية/);
});
test('Telegram is silently skipped without its variables', async () => {
  configure({ telegram: false });
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return Response.json({ ok: true });
  };
  await sendTelegramMessage('test');
  assert.equal(called, false);
});
test('Telegram messages use HTML and failures never expose the token', async () => {
  configure();
  const { messages } = services();
  await sendTelegramMessage('<b>test</b>');
  assert.deepEqual(messages, [
    {
      url: 'https://api.telegram.org/bot123:test-only/sendMessage',
      chat_id: '42',
      text: '<b>test</b>',
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    },
  ]);
  globalThis.fetch = async () =>
    Response.json({ ok: false, description: 'Bad Request: chat not found' }, { status: 400 });
  await assert.rejects(sendTelegramMessage('test'), /Telegram error 400: Bad Request: chat not/);
  globalThis.fetch = async (input) => {
    throw new Error(`fetch failed for ${String(input)}`);
  };
  await assert.rejects(sendTelegramMessage('test'), (error: Error) => {
    assert.equal(error.message, 'Telegram unreachable.');
    return true;
  });
});
test('without a database, or on a preview deployment, nothing is counted', async () => {
  configure();
  const { statements, messages } = services();
  delete process.env.DATABASE_URL;
  assert.equal((await POST(beacon())).status, 503);
  configure();
  process.env.VERCEL_ENV = 'preview';
  assert.equal((await POST(beacon())).status, 503);
  assert.deepEqual([statements, messages], [[], []]);
});
test('foreign origins, bots, bad beacons and uncounted pages never reach the database', async () => {
  configure();
  const { statements, messages } = services();
  const status = async (request: Request) => (await POST(request)).status;
  assert.equal(await status(beacon(undefined, { origin: 'https://example.com' })), 403);
  assert.equal(await status(beacon(undefined, { 'content-type': 'text/plain' })), 415);
  assert.equal(await status(beacon(undefined, { 'user-agent': 'Googlebot/2.1' })), 204);
  assert.equal(
    await status(beacon(undefined, { 'user-agent': 'Mozilla/5.0 HeadlessChrome' })),
    204,
  );
  assert.equal(await status(beacon({ sessionId: 'x', path: '/en' })), 400);
  assert.equal(await status(beacon({ sessionId, path: '/en', filler: 'x'.repeat(3000) })), 413);
  assert.equal(await status(beacon({ sessionId, path: '/en/admin', locale: 'en' })), 204);
  assert.equal(await status(beacon({ sessionId, path: '/api/visit' })), 204);
  assert.deepEqual([statements, messages], [[], []]);
});
test('the first page of a session alerts Telegram once; later pages do not', async () => {
  configure();
  Math.random = () => 0.5;
  const { rows, messages } = services();
  const first = await POST(
    beacon({ sessionId, path: '/ar', locale: 'ar', referrer: 'https://l.instagram.com/?u=x' }),
  );
  assert.equal(first.status, 204);
  assert.equal(first.headers.get('cache-control'), 'no-store');
  assert.equal((await POST(beacon({ sessionId, path: '/ar/about', locale: 'ar' }))).status, 204);
  await settle();
  assert.deepEqual(
    rows.map((r) => r.values),
    [
      ['/ar', 'ar', 'https://l.instagram.com', 'TR', 'Istanbul'],
      ['/ar/about', 'ar', null, 'TR', 'Istanbul'],
    ],
  );
  assert.equal(messages.length, 1);
  assert.equal(messages[0].parse_mode, 'HTML');
  assert.equal(
    messages[0].text,
    [
      '🌐 BYHADARA — زائر جديد',
      '📍 من: Istanbul، تركيا',
      '📄 الصفحة: /ar',
      '🗣 اللغة: العربية',
      '↩️ المصدر: l.instagram.com',
    ].join('\n'),
  );
});
test('the table is created in a new database, and old events are cleaned up now and then', async () => {
  configure({ telegram: false });
  Math.random = () => 0;
  const { rows, statements, messages } = services({ table: false });
  assert.equal((await POST(beacon())).status, 204);
  await settle();
  assert.equal(rows.length, 1);
  assert.match(statements[1], /^CREATE TABLE IF NOT EXISTS visitor_events/);
  assert.ok(statements.some((s) => s.includes('visitor_events_session_id_idx')));
  assert.ok(statements.some((s) => s.includes('visitor_events_created_at_idx')));
  assert.ok(
    statements.includes("DELETE FROM visitor_events WHERE created_at < now() - interval '30 days'"),
  );
  assert.deepEqual(messages, []);
});
test('a database or cleanup failure is logged without visit details', async () => {
  configure();
  const logged: string[] = [];
  const originalError = console.error;
  console.error = (message: string) => logged.push(message);
  try {
    const { messages } = services({ database: false });
    assert.equal((await POST(beacon())).status, 500);
    await settle();
    assert.deepEqual(messages, []);
    assert.equal(logged.length, 1);
    assert.match(logged[0], /^Visitor tracking failed\. Error connecting to database/);
    assert.doesNotMatch(logged[0], new RegExp(`${sessionId}|Istanbul|test-only`));
  } finally {
    console.error = originalError;
  }
});
