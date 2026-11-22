import test from 'node:test';
import assert from 'node:assert/strict';
import { allLocales, locales, dictionary, paths } from '../content/site';
import { articles, publishedArticles } from '../content/articles';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { metadataFor, pageSeo, structuredData, breadcrumbs } from '../lib/seo';
import { seo } from '../content/seo';
test('every written language is published, Turkish included', () => {
  assert.deepEqual(locales, ['en', 'ar', 'tr']);
  assert.deepEqual(allLocales, ['en', 'ar', 'tr']);
});
test('all 51 published corporate pages have localized metadata and equivalent alternates', () => {
  for (const locale of locales)
    for (const path of paths) {
      const m = metadataFor(locale, path);
      assert.ok(m.title);
      assert.ok(m.description);
      assert.ok(String(m.alternates?.canonical).includes(`/${locale}`));
      assert.equal(Object.keys(m.alternates?.languages || {}).length, locales.length + 1);
    }
  assert.equal(locales.length * paths.length, 51);
});
test('translations preserve the complete dictionary structure', () => {
  const keys = Object.keys(dictionary('en')).sort();
  for (const l of allLocales) assert.deepEqual(Object.keys(dictionary(l)).sort(), keys);
});
test('no unapproved or future articles are published', () => {
  const published = publishedArticles().length;
  assert.equal(published, articles.filter((a) => a.status === 'published' && a.approved).length);
  articles.push({
    slug: 'test-draft',
    status: 'draft',
    approved: false,
    category: 'corporate',
    publishedAt: '2020-01-01',
    translations: {
      en: { title: 'Test', description: 'Test', body: [] },
      ar: { title: 'اختبار', description: 'اختبار', body: [] },
      tr: { title: 'Test', description: 'Test', body: [] },
    },
  });
  assert.equal(publishedArticles().length, published);
  articles.pop();
});
test('search titles and descriptions are complete, unique and within result limits', () => {
  const titles = new Set<string>();
  for (const locale of allLocales)
    for (const path of paths) {
      const { title, description } = seo[locale][path];
      assert.ok([...title].length <= 65, `${locale}/${path} title length`);
      assert.ok(
        [...description].length >= 110 && [...description].length <= 165,
        `${locale}/${path} description length`,
      );
      assert.ok(!titles.has(title), `${locale}/${path} title is unique`);
      titles.add(title);
    }
});
test('articles are complete in every language, within search limits and use existing images', () => {
  const titles = new Set(allLocales.flatMap((l) => paths.map((p) => seo[l][p].title)));
  for (const a of publishedArticles())
    for (const locale of allLocales) {
      const t = a.translations[locale];
      const page = pageSeo(locale, `insights/${a.slug}`)!;
      assert.ok([...page.title].length <= 65, `${locale}/${a.slug} title length`);
      assert.ok(
        [...page.description].length >= 110 && [...page.description].length <= 165,
        `${locale}/${a.slug} description length`,
      );
      assert.ok(!titles.has(page.title), `${locale}/${a.slug} title is unique`);
      titles.add(page.title);
      assert.equal(t.body.length, a.translations.en.body.length, `${locale}/${a.slug} paragraphs`);
      assert.equal(t.facts?.length, a.translations.en.facts?.length, `${locale}/${a.slug} facts`);
      for (const src of [t.image, ...(t.gallery ?? []).map((g) => g.src)].filter(Boolean))
        assert.ok(existsSync(`public${src}`), `${src} exists`);
      if (t.cta?.href.startsWith('/')) assert.ok(t.cta.href.startsWith(`/${locale}/`));
    }
});
test('structured data matches the visible breadcrumbs and skips unknown routes', () => {
  const data = structuredData('ar', 'markets/gcc')!;
  const list = data['@graph'].find((n) => n['@type'] === 'BreadcrumbList') as {
    itemListElement: { name: string; item: string }[];
  };
  assert.deepEqual(
    list.itemListElement.map((i) => i.name),
    ['الرئيسية', ...breadcrumbs('ar', 'markets/gcc').map((c) => c.name)],
  );
  assert.ok(list.itemListElement.at(-1)!.item.endsWith('/ar/markets/gcc'));
  assert.equal(structuredData('en', 'businesses/unknown'), null);
  assert.deepEqual(metadataFor('en', 'not-real').robots, { index: false, follow: true });
});
test('the insights index is indexable only once it lists articles', () => {
  const robots = metadataFor('en', 'insights').robots as { index: boolean };
  assert.equal(robots.index, publishedArticles().length > 0);
});
test('the thank-you page stays out of search results and sits under Contact', () => {
  for (const locale of locales) {
    const robots = metadataFor(locale, 'contact/thank-you').robots as { index: boolean };
    assert.equal(robots.index, false);
  }
  assert.deepEqual(
    breadcrumbs('ar', 'contact/thank-you').map((c) => c.name),
    [dictionary('ar').contact, dictionary('ar').thanksLabel],
  );
});
test('Thmanyah Sans files are the unchanged originals (the licence forbids any change)', () => {
  const originals = {
    Light: '79bcb61f004600088363b40c3feea4add5a0883c326d767b0994fe1b76044c72',
    Regular: '5bb4fa412273ca31d5c7a165191568b099069cb74bf1fc1dfcdc6a3c2a97552e',
    Medium: '490bf85c58c82b5989a557ed18cd6c6e5a7518b8a440032acf946b5cb7de2850',
    Bold: '90f7c5b4c796e102eee70e20a9346fe680c8bfe38289932b5e94290d9f150fb7',
    Black: '77e81ed0e4a199c29b22fe59b05ee5efb21c09775e5127abdcb2dd7938c82b3a',
  };
  for (const [weight, sha] of Object.entries(originals)) {
    const file = readFileSync(`public/fonts/thmanyah/thmanyahsans-${weight}.woff2`);
    assert.equal(createHash('sha256').update(file).digest('hex'), sha, weight);
  }
});
