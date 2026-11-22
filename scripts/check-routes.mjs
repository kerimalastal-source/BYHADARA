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
// Links to the group sites carry where they were clicked and keep the referrer.
const referralTag = /^\?utm_source=byhadara&utm_medium=referral&utm_campaign=[a-z0-9-]+$/;
let groupLinks = 0;
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
    for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
      const href = tag.match(/href="([^"]+)"/)?.[1]?.replace(/&amp;/g, '&');
      if (!href || !/^https:\/\/www\.(hadararealestate|hadarahospitality)\.com/.test(href))
        continue;
      assert.ok(!/noreferrer/.test(tag), `${path}: ${href} drops the referrer`);
      groupLinks++;
      assert.match(new URL(href).search, referralTag, `${path}: ${href}`);
      assert.ok(!href.includes('/en/') && !href.includes('/tr/'), `${path}: old address ${href}`);
    }
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
// The bare domain keeps a link's campaign tags on its way to /en.
assert.equal(
  (
    await fetch('http://localhost:3000/?utm_source=instagram&utm_campaign=owner-bio', {
      redirect: 'manual',
    })
  ).headers.get('location'),
  '/en?utm_source=instagram&utm_campaign=owner-bio',
);
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
  '/aboutus': '/en/about',
  '/tr/beylikduzuliving': '/tr/insights/lotus-yasam-launch',
  '/tr/post/l%C3%BCks-villalar': '/tr/insights',
  '/projects/lotus-koru-2': 'https://www.hadararealestate.com/projects/lotus-koru-2',
  '/projects/unknown': '/en/businesses/real-estate',
  '/projects-1/Marmarahavenvilla': 'https://www.hadararealestate.com/projects/marmara-haven-villa',
  // Reported as 404 by Search Console on 2026-10-20.
  '/letsconnect': '/en/contact',
  '/tr/turkishcitizenship': '/tr/insights/turkish-citizenship-through-real-estate',
  '/tr/projects/lotus-koru-2': 'https://www.hadararealestate.com/projects/lotus-koru-2',
  '/service-page/proje-tan%C4%B1t%C4%B1m': '/en/businesses/real-estate',
  '/ar-sa/post/%D8%A7%D9%84%D8%A5%D9%82%D8%A7%D9%85%D8%A9':
    '/ar/insights/turkish-citizenship-through-real-estate',
  '/ru-ru/live-investinturkey': '/en/markets/turkiye',
  '/2025/02/17/hello-world': '/en',
  '/book-online': '/en/contact',
  '/turkishcitizenship': '/en/insights/turkish-citizenship-through-real-estate',
  '/privacy-policy': '/en/privacy',
  '/ru-ru/contactus': '/en/contact',
  '/tr/blog': '/tr/insights',
  '/blank-2': '/en',
  '/ar-sa/aboutus': '/ar/about',
  '/ru-ru/projects/lotus-koru-1': 'https://www.hadararealestate.com/projects/lotus-koru-1',
  '/ar-sa/projects/marmara-haven-villa':
    'https://www.hadararealestate.com/ar/projects/marmara-haven-villa',
};
for (const [from, to] of Object.entries(oldAddresses)) {
  const response = await fetch('http://localhost:3000' + from, { redirect: 'manual' });
  assert.equal(response.status, 308, from);
  assert.equal(
    new URL(response.headers.get('location'), 'http://localhost:3000').href.replace(
      'http://localhost:3000',
      '',
    ),
    to.startsWith('https://www.hadararealestate.com')
      ? `${to}?utm_source=byhadara&utm_medium=referral&utm_campaign=old-wix-redirect`
      : to,
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
    groupLinks: `${groupLinks} tagged`,
  }),
);
