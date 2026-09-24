import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { inquirySchema, normalizeWebsite } from '../lib/inquiry-schema';
import { POST } from '../app/api/inquiries/route';
import { composeEmail, rateLimit, sendInquiry } from '../lib/inquiry-service';
import { countryOptions, dialCode } from '../content/countries';
const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...originalEnv };
});
const valid = {
  topic: 'investment' as const,
  locale: 'ar' as const,
  name: 'Test Person',
  company: 'Test Company',
  country: 'SA',
  phone: '050 000 0000',
  website: 'www.example.com',
  message: 'A synthetic request used exclusively for an automated test.',
  startedAt: Date.now() - 10000,
};
function configure(extra: Record<string, string> = {}) {
  Object.assign(process.env, { RESEND_API_KEY: 'test-only', ...extra });
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.UPSTASH_REDIS_REST_URL;
}
function request(
  values: Record<string, unknown> = valid,
  origin = 'https://byhadara.com',
  type = 'application/json',
) {
  return new Request('https://byhadara.com/api/inquiries', {
    method: 'POST',
    headers: { origin, 'content-type': type },
    body: JSON.stringify(values),
  });
}
/** Mocks the email provider (and the optional limiter); returns the messages it received. */
function services({ limited = false, emailStatus = 200 } = {}) {
  const sent: Record<string, unknown>[] = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.includes('limiter')) return Response.json({ result: limited ? 6 : 1 });
    assert.equal(url, 'https://api.resend.com/emails');
    sent.push(JSON.parse(String(init?.body)));
    return emailStatus === 200
      ? Response.json({ id: 'email-001' })
      : Response.json({ message: 'rejected' }, { status: emailStatus });
  };
  return sent;
}
test('every country has a calling code and localized, sorted names', () => {
  for (const locale of ['en', 'ar', 'tr'] as const) {
    const list = countryOptions(locale);
    assert.equal(list.length, 245);
    assert.ok(list.every((c) => /^\+\d{1,4}$/.test(c.dial) && c.name && c.name !== c.iso2));
  }
  assert.equal(dialCode('TR'), '+90');
  assert.equal(dialCode('SA'), '+966');
  assert.equal(countryOptions('ar').find((c) => c.iso2 === 'PS')?.name, 'فلسطين');
});
test('schema requires name, phone and request; company and website are optional', () => {
  assert.ok(inquirySchema.safeParse(valid).success);
  assert.ok(inquirySchema.safeParse({ ...valid, company: '', website: '' }).success);
  for (const field of ['name', 'phone', 'message'] as const)
    assert.ok(!inquirySchema.safeParse({ ...valid, [field]: '' }).success, field);
  assert.ok(!inquirySchema.safeParse({ ...valid, country: 'XX' }).success);
  assert.ok(!inquirySchema.safeParse({ ...valid, phone: '+90 555 000 0000' }).success);
  assert.ok(!inquirySchema.safeParse({ ...valid, phone: '12' }).success);
  assert.ok(!inquirySchema.safeParse({ ...valid, topic: 'other' }).success);
});
test('website addresses are normalized and unsafe ones rejected', () => {
  assert.equal(normalizeWebsite('example.com'), 'https://example.com/');
  assert.equal(normalizeWebsite('http://www.example.com/about'), 'http://www.example.com/about');
  assert.equal(normalizeWebsite(''), '');
  for (const bad of [
    'javascript:alert(1)',
    'not a site',
    'localhost',
    'https://user:pw@example.com',
  ])
    assert.equal(normalizeWebsite(bad), null, bad);
});
test('email lists every field, escapes input and adds call and WhatsApp links', () => {
  const data = inquirySchema.parse({ ...valid, company: '<b>Co</b>' });
  const { subject, html, text } = composeEmail(data);
  assert.match(subject, /Investment opportunity from Test Person \(<b>Co<\/b>\)/);
  assert.ok(html.includes('&lt;b&gt;Co&lt;/b&gt;') && !html.includes('<b>Co</b>'));
  assert.ok(html.includes('+966 050 000 0000 (Saudi Arabia)'));
  assert.ok(html.includes('href="tel:+966500000000"'));
  assert.ok(html.includes('https://wa.me/966500000000'));
  assert.ok(html.includes('https://www.example.com/'));
  assert.ok(text.includes('Site language: AR'));
});
test('unconfigured backend is unavailable and does not contact services', async () => {
  delete process.env.RESEND_API_KEY;
  globalThis.fetch = async () => {
    throw new Error('Must not call');
  };
  const res = await POST(request());
  assert.equal(res.status, 503);
  assert.equal((await res.json()).accepted, undefined);
});
test('cross-origin and non-JSON requests are rejected before delivery', async () => {
  configure();
  const sent = services();
  assert.equal((await POST(request(valid, 'https://attacker.test'))).status, 403);
  assert.equal((await POST(request(valid, 'https://byhadara.com', 'text/plain'))).status, 415);
  assert.equal(sent.length, 0);
});
test('invalid fields are reported and the spam trap is silently dropped', async () => {
  configure();
  const sent = services();
  const res = await POST(request({ ...valid, phone: 'x' }));
  assert.equal(res.status, 422);
  assert.deepEqual((await res.json()).fields, ['phone']);
  assert.equal((await POST(request({ ...valid, startedAt: Date.now() }))).status, 422);
  assert.equal((await POST(request({ ...valid, websiteTrap: 'spam' }))).status, 200);
  assert.equal(sent.length, 0);
});
test('a valid request is emailed once to info@byhadara.com', async () => {
  configure();
  const sent = services();
  const res = await POST(request());
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { code: 'accepted', accepted: true });
  assert.equal(sent.length, 1);
  assert.deepEqual(sent[0].to, ['info@byhadara.com']);
});
test('provider failure never shows success', async () => {
  configure();
  services({ emailStatus: 403 });
  assert.equal((await POST(request())).status, 502);
  globalThis.fetch = async () => Response.json({});
  await assert.rejects(() => sendInquiry(inquirySchema.parse(valid)));
});
test('the optional shared rate limiter applies when configured and fails closed', async () => {
  configure();
  Object.assign(process.env, {
    UPSTASH_REDIS_REST_URL: 'https://limiter.example.test',
    UPSTASH_REDIS_REST_TOKEN: 'test-only',
    RATE_LIMIT_SALT: 'test-only-salt',
  });
  const sent = services({ limited: true });
  assert.equal((await POST(request())).status, 429);
  assert.equal(sent.length, 0);
  globalThis.fetch = async () => Response.json({ error: 'unavailable' }, { status: 500 });
  await assert.rejects(() => rateLimit('test-address'));
  assert.equal((await POST(request())).status, 502);
});
