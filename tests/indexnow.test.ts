import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  builtFileFor,
  changedUrls,
  contentFingerprint,
  manifestToPublish,
  sitemapUrls,
  submitIndexNow,
} from '../lib/indexnow';

const page = (main: string, chunk = 'a1b2') =>
  `<html><head><title>Türkiye | BYHADARA Group</title><meta name="description" content="Istanbul base"/>` +
  `<link rel="stylesheet" href="/_next/static/css/${chunk}.css"/></head><body>` +
  `<main id="main">${main}<img src="/_next/static/media/logo.${chunk}.png"/>` +
  `<script>self.__next_f.push([1,"${chunk}"])</script></main></body></html>`;

test('the key file is served with the key', () => {
  assert.match(INDEXNOW_KEY, /^[a-f0-9]{32}$/);
  assert.equal(readFileSync(`public/${INDEXNOW_KEY}.txt`, 'utf8').trim(), INDEXNOW_KEY);
});

test('the fingerprint follows the content, not build hashes or scripts', () => {
  assert.equal(
    contentFingerprint(page('<h1>Türkiye</h1>')),
    contentFingerprint(page('<h1>Türkiye</h1>', 'c3d4')),
  );
  assert.notEqual(
    contentFingerprint(page('<h1>Türkiye</h1>')),
    contentFingerprint(page('<h1>GCC</h1>')),
  );
  assert.notEqual(
    contentFingerprint(page('<h1>Türkiye</h1>')),
    contentFingerprint(page('<h1>Türkiye</h1>').replace('Istanbul base', 'Istanbul')),
  );
});

test('sitemap URLs map to the prerendered pages and only new or changed ones are sent', () => {
  const xml =
    '<urlset><url><loc>https://www.byhadara.com/en</loc></url><url><loc>https://www.byhadara.com/ar/markets/gcc</loc></url></urlset>';
  assert.deepEqual(sitemapUrls(xml), [
    'https://www.byhadara.com/en',
    'https://www.byhadara.com/ar/markets/gcc',
  ]);
  assert.equal(builtFileFor('https://www.byhadara.com/en'), 'en.html');
  assert.equal(builtFileFor('https://www.byhadara.com/ar/markets/gcc'), 'ar/markets/gcc.html');
  const next = { a: '1', b: '2', c: '3' };
  assert.deepEqual(changedUrls(null, next), ['a', 'b', 'c']);
  assert.deepEqual(changedUrls({ a: '1', b: 'old', gone: '9' }, next), ['b', 'c']);
  assert.deepEqual(manifestToPublish(next, ['b']), { a: '1', c: '3' });
});

test('submission posts the key and URLs, and reports refusals without throwing', async () => {
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  const logs: string[] = [];
  const reply = (status: number) =>
    (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), body: JSON.parse(String(init?.body)) });
      return new Response('SiteVerificationNotCompleted', { status });
    }) as typeof fetch;
  const urls = ['https://www.byhadara.com/en'];
  assert.equal(
    await submitIndexNow(urls, 'https://www.byhadara.com', {
      fetch: reply(202),
      log: (m) => logs.push(m),
    }),
    1,
  );
  assert.equal(calls[0].url, INDEXNOW_ENDPOINT);
  assert.deepEqual(calls[0].body, {
    host: 'www.byhadara.com',
    key: INDEXNOW_KEY,
    keyLocation: `https://www.byhadara.com/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  });
  assert.equal(
    await submitIndexNow(urls, 'https://www.byhadara.com', {
      fetch: reply(403),
      log: (m) => logs.push(m),
    }),
    0,
  );
  assert.match(logs[0], /HTTP 403 SiteVerificationNotCompleted/);
  const offline = (async () => {
    throw new Error('offline');
  }) as typeof fetch;
  assert.equal(
    await submitIndexNow(urls, 'https://www.byhadara.com', {
      fetch: offline,
      log: (m) => logs.push(m),
    }),
    0,
  );
  assert.match(logs[1], /batch failed: offline/);
});
