import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { inquirySchema, normalizeWebsite } from '../lib/inquiry-schema';
import { invalidFields } from '../lib/inquiry-rules';
import { POST } from '../app/api/inquiries/route';
import { composeEmail, rateLimit, sendInquiry } from '../lib/inquiry-service';
import { resetHubspotSchema, saveToHubspot } from '../lib/hubspot';
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
  email: ' Test.Person@Example.com ',
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
  delete process.env.HUBSPOT_ACCESS_TOKEN;
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
test('schema requires name, email, phone and request; the rest is optional', () => {
  const parsed = inquirySchema.parse(valid);
  assert.equal(parsed.email, 'test.person@example.com');
  assert.equal(parsed.marketing, false);
  assert.equal(inquirySchema.parse({ ...valid, marketing: 'yes' }).marketing, true);
  assert.ok(!inquirySchema.safeParse({ ...valid, marketing: 'no' }).success);
  assert.ok(inquirySchema.safeParse({ ...valid, company: '', website: '' }).success);
  for (const field of ['name', 'email', 'phone', 'message'] as const)
    assert.ok(!inquirySchema.safeParse({ ...valid, [field]: '' }).success, field);
  assert.ok(!inquirySchema.safeParse({ ...valid, email: 'name@company' }).success);
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
  assert.ok(html.includes('href="mailto:test.person@example.com"'));
  assert.ok(text.includes('Email updates: Not requested'));
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
  assert.equal(sent[0].reply_to, 'test.person@example.com');
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

type Call = { method: string; path: string; body?: Record<string, any> };
/** Mocks the HubSpot API; `reply` answers each call and every call is recorded. */
function hubspot(reply: (call: Call) => [number, unknown?]) {
  const calls: Call[] = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    assert.equal(url.origin, 'https://api.hubapi.com');
    assert.equal(new Headers(init?.headers).get('authorization'), 'Bearer test-token');
    const call = {
      method: init?.method || 'GET',
      path: url.pathname + url.search,
      body: init?.body ? JSON.parse(String(init.body)) : undefined,
    };
    calls.push(call);
    const [status, body = {}] = reply(call);
    return Response.json(body, { status });
  };
  return calls;
}
const contactPath = '/crm/v3/objects/contacts/test.person%40example.com?idProperty=email';
test('a new visitor becomes a HubSpot lead with the request attached as a note', async () => {
  process.env.HUBSPOT_ACCESS_TOKEN = 'test-token';
  resetHubspotSchema();
  const calls = hubspot(({ method, path }) =>
    path.startsWith('/crm/v3/properties')
      ? [201]
      : method === 'GET'
        ? [404, { category: 'OBJECT_NOT_FOUND' }]
        : path === '/crm/v3/objects/contacts'
          ? [201, { id: '101' }]
          : [201, { id: '900' }],
  );
  const id = await saveToHubspot(
    inquirySchema.parse({ ...valid, message: 'Line one <script>\nLine two' }),
  );
  assert.equal(id, '101');
  assert.equal(calls.filter((c) => c.path.startsWith('/crm/v3/properties')).length, 5);
  const create = calls.find((c) => c.method === 'POST' && c.path === '/crm/v3/objects/contacts')!;
  assert.deepEqual(create.body!.properties, {
    email: 'test.person@example.com',
    firstname: 'Test',
    lastname: 'Person',
    phone: '+966500000000',
    company: 'Test Company',
    website: 'https://www.example.com/',
    byhadara_request_types: 'investment',
    byhadara_language: 'ar',
    lifecyclestage: 'lead',
  });
  const note = calls.at(-1)!;
  assert.equal(note.path, '/crm/v3/objects/notes');
  assert.deepEqual(note.body!.associations[0], {
    to: { id: '101' },
    types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
  });
  assert.ok(note.body!.properties.hs_note_body.includes('Line one &lt;script&gt;<br>Line two'));
  assert.ok(note.body!.properties.hs_note_body.includes('Email updates: Not requested'));
});
test('a returning visitor is updated, request types add up and consent is recorded', async () => {
  process.env.HUBSPOT_ACCESS_TOKEN = 'test-token';
  resetHubspotSchema();
  const calls = hubspot(({ method, path }) =>
    path.startsWith('/crm/v3/properties')
      ? [409, { category: 'CONFLICT' }]
      : method === 'GET'
        ? [200, { id: '55', properties: { byhadara_request_types: 'general' } }]
        : method === 'PATCH'
          ? [200, { id: '55' }]
          : [201, { id: '901' }],
  );
  await saveToHubspot(inquirySchema.parse({ ...valid, marketing: 'yes', name: 'Ali' }));
  const update = calls.find((c) => c.method === 'PATCH')!;
  assert.equal(update.path, contactPath);
  const props = update.body!.properties;
  assert.equal(props.byhadara_request_types, 'general;investment');
  assert.equal(props.byhadara_email_consent, 'true');
  assert.ok(!Number.isNaN(Date.parse(props.byhadara_email_consent_date)));
  assert.equal(props.firstname, 'Ali');
  assert.equal('lastname' in props, false);
  assert.equal('lifecyclestage' in props, false);
  assert.equal(calls.at(-1)!.body!.associations[0].to.id, '55');
});
test('without permission for custom properties the basic details are still saved', async () => {
  process.env.HUBSPOT_ACCESS_TOKEN = 'test-token';
  resetHubspotSchema();
  let attempts = 0;
  const calls = hubspot(({ method, path, body }) => {
    if (path.startsWith('/crm/v3/properties')) return [403, { category: 'MISSING_SCOPES' }];
    if (method === 'GET') return [404];
    if (path === '/crm/v3/objects/contacts') {
      attempts++;
      // HubSpot rejects the lead stage in this account: the retry keeps the basic details.
      return 'lifecyclestage' in body!.properties
        ? [400, { category: 'VALIDATION_ERROR' }]
        : [201, { id: '7' }];
    }
    return [201, { id: '902' }];
  });
  assert.equal(await saveToHubspot(inquirySchema.parse(valid)), '7');
  assert.equal(attempts, 2);
  const saved = calls.filter((c) => c.path === '/crm/v3/objects/contacts').at(-1)!;
  assert.equal(
    Object.keys(saved.body!.properties).some((k) => k.startsWith('byhadara_')),
    false,
  );
  assert.ok(calls.at(-1)!.body!.properties.hs_note_body.includes('Site language: AR'));
});
test('a HubSpot failure never affects the visitor and is logged without personal data', async () => {
  configure();
  process.env.HUBSPOT_ACCESS_TOKEN = 'test-token';
  resetHubspotSchema();
  const logged: string[] = [];
  const originalError = console.error;
  console.error = (message: string) => logged.push(message);
  const emails: string[] = [];
  globalThis.fetch = async (input) => {
    if (String(input) === 'https://api.resend.com/emails') {
      emails.push('sent');
      return Response.json({ id: 'email-002' });
    }
    return Response.json({ category: 'MISSING_SCOPES' }, { status: 403 });
  };
  try {
    const res = await POST(request());
    assert.equal(res.status, 200);
    assert.equal(emails.length, 1);
    await new Promise((resolve) => setTimeout(resolve, 20));
  } finally {
    console.error = originalError;
  }
  assert.equal(logged.length, 1);
  assert.match(
    logged[0],
    /^HubSpot sync failed\. Find contact: HubSpot responded 403 MISSING_SCOPES$/,
  );
});
test('the browser check flags exactly the fields the server rejects', () => {
  const cases: Record<string, string>[] = [
    {},
    { name: 'A' },
    { name: 'x'.repeat(121) },
    { name: 'Bad\u0007name' },
    { email: 'name@company' },
    { email: 'a..b@example.com' },
    { email: `${'a'.repeat(250)}@example.com` },
    { email: '  NAME@Example.COM ' },
    { country: '' },
    { phone: '+90 555 000 0000' },
    { phone: '12' },
    { phone: '1'.repeat(15) },
    { phone: '(212) 555-01.23' },
    { company: 'x'.repeat(181) },
    { website: 'not a site' },
    { website: 'https://user:pass@example.com' },
    { website: 'example.co.uk/path' },
    { message: 'too short' },
    { message: '   Ten chars  ' },
    { message: 'x'.repeat(3001) },
  ];
  for (const change of cases) {
    const values = { ...valid, ...change };
    const parsed = inquirySchema.safeParse(values);
    const server = parsed.success
      ? []
      : [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
    assert.deepEqual(invalidFields(values).sort(), server.sort(), JSON.stringify(change));
  }
});
