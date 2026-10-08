import assert from 'node:assert/strict';
const paths = [
  '',
  'about',
  'businesses',
  'businesses/real-estate',
  'businesses/hospitality',
  'markets',
  'markets/turkiye',
  'markets/gcc',
  'markets/egypt',
  'partnerships',
  'insights',
  'contact',
  'contact/thank-you',
  'inquiries/investment',
  'inquiries/partnership',
  'privacy',
  'terms',
];
// Every published article, as listed on the insights index.
const index = await (await fetch('http://localhost:3000/en/insights')).text();
for (const [, slug] of index.matchAll(/href="\/en\/insights\/([^"/?#]+)"/g))
  if (!paths.includes(`insights/${slug}`)) paths.push(`insights/${slug}`);
const pages = [];
const links = new Set();
const titles = new Set();
let indexable = 0;
for (const lang of ['en', 'ar', 'tr'])
  for (const p of paths) {
    const path = `/${lang}${p ? '/' + p : ''}`;
    const r = await fetch('http://localhost:3000' + path);
    assert.equal(r.status, 200, path);
    const html = await r.text();
    assert.ok(html.includes(`lang="${lang}"`), path);
    assert.ok(html.includes(`dir="${lang === 'ar' ? 'rtl' : 'ltr'}"`), path);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path);
    assert.ok(html.includes('rel="canonical"'), path);
    assert.ok(html.includes('hrefLang="x-default"'), path);
    assert.ok(html.includes('property="og:image"'), path);
    assert.ok(html.includes('application/ld+json'), path);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `${path} title is unique`);
    titles.add(title);
    if (!/<meta name="robots" content="[^"]*noindex/.test(html)) indexable++;
    for (const m of html.matchAll(/href="(\/(?:en|ar|tr)(?:\/[^"?#]*)?)(?:[?#][^"]*)?"/g))
      links.add(m[1]);
    pages.push(path);
  }
for (const path of links) {
  assert.equal((await fetch('http://localhost:3000' + path)).status, 200, path);
}
assert.equal((await fetch('http://localhost:3000/en/not-real')).status, 404);
assert.equal((await fetch('http://localhost:3000/ar/insights/not-published')).status, 404);
assert.equal((await fetch('http://localhost:3000/de')).status, 404);
assert.equal((await fetch('http://localhost:3000/api/inquiries', { method: 'POST' })).status, 503);
assert.equal((await fetch('http://localhost:3000/api/visit', { method: 'POST' })).status, 503);
const sitemap = await (await fetch('http://localhost:3000/sitemap.xml')).text();
assert.equal((sitemap.match(/<loc>/g) || []).length, indexable);
const robots = await (await fetch('http://localhost:3000/robots.txt')).text();
assert.ok(robots.includes('Disallow: /api/'));
assert.equal((await fetch('http://localhost:3000/', { redirect: 'manual' })).status, 308);
// Addresses of the former Wix site that Google still crawls (Search Console, 2026-10-08).
const oldAddresses = {
  '/post/why-invest-in-real-estate-in-turkey': '/en/insights/buying-property-in-turkiye',
  '/post/living-in-istanbul': '/en/markets/turkiye',
  '/post/some-other-post': '/en/insights',
  '/en-us/post/best-areas-to-buy-property-in-istanbul':
    '/en/insights/western-istanbul-beylikduzu-buyukcekmece',
  '/ru-ru/turkishcitizenship': '/en/insights/turkish-citizenship-through-real-estate',
  '/ru-ru': '/en',
  '/ar-sa': '/ar',
  '/projects/unknown': '/en/businesses/real-estate',
  '/projects-1/Marmarahavenvilla': 'https://www.hadararealestate.com/projects/marmara-haven-villa',
};
for (const [from, to] of Object.entries(oldAddresses)) {
  const response = await fetch('http://localhost:3000' + from, { redirect: 'manual' });
  assert.equal(response.status, 308, from);
  assert.equal(
    new URL(response.headers.get('location'), 'http://localhost:3000').href.replace(
      'http://localhost:3000',
      '',
    ),
    to,
    from,
  );
  if (to.startsWith('/')) assert.equal((await fetch('http://localhost:3000' + to)).status, 200, to);
}
for (const asset of ['/manifest.webmanifest', '/icon-512.png', '/og/byhadara-ar.jpg'])
  assert.equal((await fetch('http://localhost:3000' + asset)).status, 200, asset);
console.log(
  JSON.stringify({
    pages: pages.length,
    internalLinks: links.size,
    metadata: 'passed',
    locales: 'passed',
    sitemap: `${indexable} URLs`,
    seo: 'passed',
    notFound: 'passed',
    unconfiguredAPIs: 503,
    oldAddresses: 'redirected',
  }),
);
