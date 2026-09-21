import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { inquirySchema, checkPdf, MAX_FILE_BYTES } from '../lib/inquiry-schema';
import { POST } from '../app/api/inquiries/route';
import { deliverInquiry, rateLimit } from '../lib/inquiry-service';
const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...originalEnv };
});
const valid = {
  kind: 'investment' as const,
  name: 'Test Person',
  company: 'Test Company',
  email: 'test@example.com',
  phone: '+90 555 000 0000',
  country: 'Türkiye',
  description: 'A synthetic proposal used exclusively for an automated test.',
  sector: 'real-estate' as const,
  opportunity: 'joint-venture' as const,
  consent: 'yes' as const,
  locale: 'en' as const,
  websiteTrap: '',
  startedAt: Date.now() - 10000,
  requestId: '2adcf0aa-5f4f-47bf-9b20-6e80e0a5f742',
  token: 'synthetic-token',
};
function configure() {
  Object.assign(process.env, {
    INQUIRIES_ENABLED: 'true',
    PRIVACY_REVIEWED: 'true',
    INQUIRY_WEBHOOK_URL: 'https://receiver.example.test',
    INQUIRY_WEBHOOK_SECRET: 'test-only',
    UPSTASH_REDIS_REST_URL: 'https://limiter.example.test',
    UPSTASH_REDIS_REST_TOKEN: 'test-only',
    TURNSTILE_SECRET_KEY: 'test-only',
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'test-only',
    CONTACT_EMAIL: 'test@example.com',
    RATE_LIMIT_SALT: 'test-only-salt',
    TURNSTILE_HOSTNAMES: 'byhadara.com',
    INQUIRY_ALLOWED_ORIGINS: 'https://byhadara.com',
  });
}
function request(
  values: Record<string, unknown> = valid,
  file?: File,
  origin = 'https://byhadara.com',
) {
  const fd = new FormData();
  Object.entries(values).forEach(([k, v]) => fd.set(k, String(v)));
  if (file) fd.set('attachment', file);
  return new Request('https://byhadara.com/api/inquiries', {
    method: 'POST',
    headers: { origin },
    body: fd,
  });
}
function services({ limited = false, challenge = true, accepted = true, quarantine = true } = {}) {
  let delivered = 0;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.includes('limiter')) return Response.json({ result: limited ? 6 : 1 });
    if (url.includes('turnstile'))
      return Response.json({ success: challenge, action: 'inquiry', hostname: 'byhadara.com' });
    delivered++;
    const body = JSON.parse(String(init?.body));
    assert.equal(body.token, undefined);
    assert.equal(body.websiteTrap, undefined);
    return Response.json({
      accepted,
      id: 'TEST-001',
      ...(quarantine ? { attachmentStatus: 'quarantined' } : {}),
    });
  };
  return () => delivered;
}
test('schema rejects missing consent, invalid category and malicious URL', () => {
  assert.ok(inquirySchema.safeParse(valid).success);
  assert.ok(!inquirySchema.safeParse({ ...valid, consent: 'no' }).success);
  assert.ok(!inquirySchema.safeParse({ ...valid, sector: 'made-up' }).success);
  assert.ok(
    !inquirySchema.safeParse({
      ...valid,
      kind: 'partnership',
      industry: 'Supply',
      partnership: 'distribution',
      website: 'javascript:alert(1)',
    }).success,
  );
});
test('PDF checks reject disguised and oversized attachments', async () => {
  assert.ok(
    await checkPdf(new File(['%PDF-1.7\nTest\n%%EOF'], 'company.pdf', { type: 'application/pdf' })),
  );
  assert.ok(
    !(await checkPdf(
      new File(['<script>alert(1)</script>'], 'company.pdf', { type: 'application/pdf' }),
    )),
  );
  assert.ok(
    !(await checkPdf(new File(['%PDF-1.7\n%%EOF'], 'company.html', { type: 'application/pdf' }))),
  );
  assert.ok(
    !(await checkPdf(
      new File([new Uint8Array(MAX_FILE_BYTES + 1)], 'large.pdf', { type: 'application/pdf' }),
    )),
  );
});
test('unconfigured backend is unavailable and does not contact services', async () => {
  delete process.env.INQUIRIES_ENABLED;
  globalThis.fetch = async () => {
    throw new Error('Must not call');
  };
  const res = await POST(request());
  assert.equal(res.status, 503);
  assert.equal((await res.json()).accepted, undefined);
});
test('cross-origin request is rejected before delivery', async () => {
  configure();
  const count = services();
  assert.equal((await POST(request(valid, undefined, 'https://attacker.test'))).status, 403);
  assert.equal(count(), 0);
});
test('invalid fields and spam trap rejected', async () => {
  configure();
  const count = services();
  assert.equal((await POST(request({ ...valid, email: 'bad' }))).status, 422);
  assert.equal((await POST(request({ ...valid, websiteTrap: 'spam' }))).status, 422);
  assert.equal(count(), 0);
});
test('shared rate limiter and challenge fail closed', async () => {
  configure();
  const count = services({ limited: true });
  assert.equal((await POST(request())).status, 429);
  assert.equal(count(), 0);
  services({ challenge: false });
  assert.equal((await POST(request())).status, 403);
});
test('successful flow only acknowledges verified receiver acceptance', async () => {
  configure();
  const count = services();
  const res = await POST(request());
  assert.equal(res.status, 201);
  assert.deepEqual(await res.json(), { code: 'accepted', accepted: true, id: 'TEST-001' });
  assert.equal(count(), 1);
});
test('failed acceptance and attachment quarantine never show success', async () => {
  configure();
  services({ accepted: false });
  assert.equal((await POST(request())).status, 503);
  services({ quarantine: false });
  const file = new File(['%PDF-1.7\nTest\n%%EOF'], 'profile.pdf', { type: 'application/pdf' });
  assert.equal((await POST(request(valid, file))).status, 503);
});
test('limiter failure does not become permissive', async () => {
  configure();
  globalThis.fetch = async () => Response.json({ error: 'unavailable' }, { status: 500 });
  await assert.rejects(() => rateLimit('test-address'));
  assert.equal((await POST(request())).status, 503);
});
test('webhook refuses redirects and unacknowledged persistence', async () => {
  configure();
  globalThis.fetch = async () => Response.json({ ok: true });
  await assert.rejects(() => deliverInquiry(valid));
});
