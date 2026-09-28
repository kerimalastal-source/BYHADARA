import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/visit/route';
import { databaseVariables } from '../lib/db';
import { sendTelegramMessage } from '../lib/telegram';
import {
  newVisitorMessage,
  parseVisit,
  publicPageLocale,
  pageTime,
  referrerOrigin,
  visitLength,
  visitUpdateMessage,
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
function configure({ telegram = true, database = 'DATABASE_URL' } = {}) {
  for (const name of databaseVariables) delete process.env[name];
  delete process.env.VERCEL_ENV;
  process.env[database] = 'postgresql://test:test-only@db.example.test/visits';
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
 * A stand-in for Neon's HTTP API and Telegram. It keeps visitor_events and visitor_alerts in
 * memory, answers the save statement the way Postgres does (checked against a real Postgres in
 * development), and returns the Telegram calls and SQL statements it received. `clock.now` is the
 * database time in milliseconds.
 */
function services({ table = true, database = true, editStatus = 200 } = {}) {
  const rows: { session_id: string; values: unknown[]; at: number }[] = [];
  const alerts = new Map<string, number>();
  const statements: string[] = [];
  const messages: Record<string, unknown>[] = [];
  const clock = { now: 0 };
  let nextMessage = 100;
  const empty = { fields: [], rows: [], rowCount: 0, command: 'OK' };
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.startsWith('https://api.telegram.org/')) {
      const method = url.slice(url.lastIndexOf('/') + 1);
      messages.push({ method, url, ...JSON.parse(String(init?.body)) });
      if (method === 'editMessageText' && editStatus !== 200)
        return Response.json(
          { ok: false, description: 'Bad Request: message to edit not found' },
          { status: editStatus },
        );
      const body = JSON.parse(String(init?.body));
      // Telegram numbers new messages; an edit returns the message it changed.
      const id = method === 'sendMessage' ? nextMessage++ : body.message_id;
      return Response.json({ ok: true, result: { message_id: id } });
    }
    if (!database) throw new Error('connect ECONNREFUSED');
    const body = JSON.parse(String(init?.body));
    if (body.queries) {
      statements.push(...body.queries.map((q: { query: string }) => q.query));
      table = true;
      return Response.json({ results: body.queries.map(() => empty) });
    }
    statements.push(body.query);
    if (!table)
      return Response.json(
        { message: 'relation "visitor_alerts" does not exist', code: '42P01' },
        { status: 400 },
      );
    if (body.query.includes('INSERT INTO visitor_events')) {
      // The inserted row is the last six parameters: session id, path, locale, referrer, country, city.
      const values = body.params.slice(-6);
      const prior = rows.filter((r) => r.session_id === values[0]);
      rows.push({ session_id: values[0], values: values.slice(1), at: clock.now });
      const landing = prior[0]?.values ?? [null, null, null, null, null];
      const field = (name: string, dataTypeID: number) => ({ name, dataTypeID });
      return Response.json({
        fields: [
          field('pages', 23),
          field('seen', 16),
          field('seconds', 23),
          field('at', 701),
          field('views', 114),
          ...['path', 'locale', 'referrer', 'country', 'city', 'message_id'].map((n) =>
            field(n, 25),
          ),
        ],
        rows: [
          [
            String(prior.length),
            prior.some((r) => r.values[0] === values[1]) ? 't' : 'f',
            String(prior.length ? Math.round((clock.now - prior[0].at) / 1000) : 0),
            String(clock.now / 1000),
            JSON.stringify(prior.slice(-60).map((r) => ({ path: r.values[0], at: r.at / 1000 }))),
            ...landing,
            alerts.has(values[0]) ? String(alerts.get(values[0])) : null,
          ],
        ],
        rowCount: 1,
        command: 'INSERT',
      });
    }
    if (body.query.includes('INSERT INTO visitor_alerts') && !alerts.has(body.params[0]))
      alerts.set(body.params[0], Number(body.params[1]));
    return Response.json(empty);
  };
  const sent = () => messages.filter((m) => m.method === 'sendMessage');
  const edits = () => messages.filter((m) => m.method === 'editMessageText');
  return { rows, alerts, statements, messages, sent, edits, clock };
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
      '📄 الصفحة: \u200E/ar/businesses/real-estate',
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
test('the visit length reads naturally in Arabic', () => {
  const lengths = [0, 59, 60, 150, 185, 600, 660, 3599, 3600].map(visitLength);
  assert.deepEqual(lengths, [
    'أقل من دقيقة',
    'أقل من دقيقة',
    'دقيقة',
    'دقيقتان',
    '3 دقائق',
    '10 دقائق',
    '11 دقيقة',
    '59 دقيقة',
    'أكثر من ساعة',
  ]);
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
      method: 'sendMessage',
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
test('the first page sends the alert; later pages update it without a new message', async () => {
  // The variable name Vercel gave the byhadara project's database.
  configure({ database: 'STORAGE_URL_DATABASE_URL' });
  Math.random = () => 0.5;
  const { rows, alerts, messages, sent, edits, clock } = services();
  const first = await POST(
    beacon({ sessionId, path: '/ar', locale: 'ar', referrer: 'https://l.instagram.com/?u=x' }),
  );
  assert.equal(first.status, 204);
  assert.equal(first.headers.get('cache-control'), 'no-store');
  await settle();
  clock.now += 185_000;
  assert.equal((await POST(beacon({ sessionId, path: '/ar/about', locale: 'ar' }))).status, 204);
  await settle();
  assert.deepEqual(
    rows.map((r) => r.values),
    [
      ['/ar', 'ar', 'https://l.instagram.com', 'TR', 'Istanbul'],
      ['/ar/about', 'ar', null, 'TR', 'Istanbul'],
    ],
  );
  assert.equal(sent().length, 1);
  assert.equal(sent()[0].parse_mode, 'HTML');
  assert.equal(
    sent()[0].text,
    [
      '🌐 BYHADARA — زائر جديد',
      '📍 من: Istanbul، تركيا',
      '📄 الصفحة: \u200E/ar',
      '🗣 اللغة: العربية',
      '↩️ المصدر: l.instagram.com',
    ].join('\n'),
  );
  assert.equal(alerts.get(sessionId), 100);
  assert.equal(edits().length, 1);
  assert.equal(edits()[0].message_id, 100);
  assert.equal(edits()[0].parse_mode, 'HTML');
  assert.equal(
    edits()[0].text,
    [
      '🌐 BYHADARA — زائر جديد',
      '📍 من: Istanbul، تركيا',
      '🗣 اللغة: العربية',
      '↩️ المصدر: l.instagram.com',
      '🔢 عدد الصفحات: 2 · مدة الزيارة: 3 دقائق',
      '🧭 مسار الزيارة:',
      '1. \u200E/ar · 3 د',
      '2. \u200E/ar/about',
      '👣 آخر صفحة: \u200E/ar/about',
    ].join('\n'),
  );
  assert.equal(messages.length, 2);
});
test('the updated alert lists every page in order with the time spent on it', async () => {
  configure();
  Math.random = () => 0.5;
  const { edits, clock } = services();
  for (const [path, wait] of [
    ['/en', 40_000],
    ['/en/businesses/real-estate', 130_000],
    ['/en/about', 5_000],
    ['/en/contact', 0],
  ] as const) {
    assert.equal((await POST(beacon({ sessionId, path, locale: 'en' }))).status, 204);
    await settle();
    clock.now += wait;
  }
  assert.equal(
    edits().at(-1)?.text,
    [
      '🌐 BYHADARA — زائر جديد',
      '📍 من: Istanbul، تركيا',
      '🗣 اللغة: الإنجليزية',
      '↩️ المصدر: مباشر',
      '🔢 عدد الصفحات: 4 · مدة الزيارة: دقيقتان',
      '🧭 مسار الزيارة:',
      '1. \u200E/en · 40 ث',
      '2. \u200E/en/businesses/real-estate · 2 د',
      '3. \u200E/en/about · 5 ث',
      '4. \u200E/en/contact',
      '👣 آخر صفحة: \u200E/en/contact',
    ].join('\n'),
  );
});
test('a long visit lists its latest 30 pages and counts the rest', () => {
  const trail = Array.from({ length: 30 }, (_, i) => ({
    path: `/en/insights/page-${i}`,
    seconds: i < 29 ? 10 : null,
  }));
  const state = (hiddenPages: number) => ({
    first: false,
    pages: 30 + hiddenPages,
    seconds: 600,
    newPage: true,
    landing: { ...visit, locale: 'en' as const },
    trail,
    hiddenPages,
    messageId: 100,
  });
  const current = { ...visit, locale: 'en' as const, path: '/en/insights/page-29' };
  const lines = (hidden: number) => visitUpdateMessage(current, state(hidden)).split('\n');
  assert.equal(lines(0).filter((l) => /^\d+\. /.test(l)).length, 30);
  assert.ok(!lines(0).some((l) => l.startsWith('…')));
  assert.deepEqual(
    [1, 2, 5, 12].map((n) => lines(n).find((l) => l.startsWith('…'))),
    ['… وصفحة واحدة قبلها', '… وصفحتان قبلها', '… و5 صفحات قبلها', '… و12 صفحة قبلها'],
  );
  const numbered = lines(12).filter((l) => /^\d+\. /.test(l));
  assert.match(numbered[0], /^13\. \u200E\/en\/insights\/page-0 · 10 ث$/);
  assert.match(numbered[29], /^42\. \u200E\/en\/insights\/page-29$/);
  assert.deepEqual([0.4, 40, 59.9, 60, 185, 3599, 3600].map(pageTime), [
    '1 ث',
    '40 ث',
    '59 ث',
    '1 د',
    '3 د',
    '59 د',
    'أكثر من ساعة',
  ]);
});
test('the first opening of a request page sends one extra alert, as a reply', async () => {
  configure();
  Math.random = () => 0.5;
  const { sent, edits } = services();
  const view = async (path: string, id = sessionId) => {
    assert.equal((await POST(beacon({ sessionId: id, path, locale: 'en' }))).status, 204);
    await settle();
  };
  await view('/en');
  await view('/en/contact');
  await view('/en/about');
  await view('/en/contact');
  await view('/en/inquiries/investment');
  assert.equal(edits().length, 4);
  assert.deepEqual(
    sent().map((m) => [m.text, m.reply_parameters]),
    [
      [sent()[0].text, undefined],
      [
        '🔥 الزائر فتح صفحة التواصل\n📍 Istanbul، تركيا · 📄 \u200E/en/contact',
        { message_id: 100, allow_sending_without_reply: true },
      ],
      [
        '🔥 الزائر فتح صفحة الاستثمار\n📍 Istanbul، تركيا · 📄 \u200E/en/inquiries/investment',
        { message_id: 100, allow_sending_without_reply: true },
      ],
    ],
  );
  // Landing straight on a request page: the new-visitor alert, then the extra alert under it.
  const other = '11111111-2222-4333-8444-555555555555';
  await view('/en/inquiries/partnership', other);
  const [alert, request] = sent().slice(-2);
  assert.match(String(alert.text), /^🌐 BYHADARA — زائر جديد\n/);
  assert.equal(
    request.text,
    '🔥 الزائر فتح صفحة الشراكة\n📍 Istanbul، تركيا · 📄 \u200E/en/inquiries/partnership',
  );
  assert.deepEqual(request.reply_parameters, {
    message_id: 103,
    allow_sending_without_reply: true,
  });
});
test('an alert the team deleted is not updated, but request pages still alert', async () => {
  configure();
  Math.random = () => 0.5;
  const logged: string[] = [];
  const originalError = console.error;
  console.error = (message: string) => logged.push(message);
  try {
    const { sent, edits } = services({ editStatus: 400 });
    for (const path of ['/tr', '/tr/contact']) {
      assert.equal((await POST(beacon({ sessionId, path, locale: 'tr' }))).status, 204);
      await settle();
    }
    assert.equal(edits().length, 1);
    assert.equal(sent().length, 2);
    assert.match(String(sent()[1].text), /^🔥 الزائر فتح صفحة التواصل/);
    assert.deepEqual(logged, [
      'Visitor alert update failed. Telegram error 400: Bad Request: message to edit not found',
    ]);
  } finally {
    console.error = originalError;
  }
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
  assert.ok(statements.some((s) => s.startsWith('CREATE TABLE IF NOT EXISTS visitor_alerts')));
  for (const table of ['visitor_events', 'visitor_alerts'])
    assert.ok(
      statements.includes(`DELETE FROM ${table} WHERE created_at < now() - interval '30 days'`),
      table,
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
