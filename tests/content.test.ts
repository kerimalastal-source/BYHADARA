import test from 'node:test';
import assert from 'node:assert/strict';
import { locales, dictionary, paths } from '../content/site';
import { articles, publishedArticles } from '../content/articles';
import { metadataFor, structuredData, breadcrumbs } from '../lib/seo';
import { seo } from '../content/seo';
test('all 51 corporate pages have localized metadata and equivalent alternates', () => {
  for (const locale of locales)
    for (const path of paths) {
      const m = metadataFor(locale, path);
      assert.ok(m.title);
      assert.ok(m.description);
      assert.ok(String(m.alternates?.canonical).includes(`/${locale}`));
      assert.equal(Object.keys(m.alternates?.languages || {}).length, 4);
    }
  assert.equal(locales.length * paths.length, 51);
});
test('translations preserve the complete dictionary structure', () => {
  const keys = Object.keys(dictionary('en')).sort();
  for (const l of locales) assert.deepEqual(Object.keys(dictionary(l)).sort(), keys);
});
test('no unapproved or future articles are published', () => {
  assert.equal(publishedArticles().length, 0);
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
  assert.equal(publishedArticles().length, 0);
  articles.pop();
});
test('search titles and descriptions are complete, unique and within result limits', () => {
  const titles = new Set<string>();
  for (const locale of locales)
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
