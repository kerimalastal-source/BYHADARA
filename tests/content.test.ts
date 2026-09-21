import test from 'node:test';
import assert from 'node:assert/strict';
import { locales, dictionary, paths } from '../content/site';
import { articles, publishedArticles } from '../content/articles';
import { metadataFor } from '../lib/seo';
test('all 48 corporate pages have localized metadata and equivalent alternates', () => {
  for (const locale of locales)
    for (const path of paths) {
      const m = metadataFor(locale, path);
      assert.ok(m.title);
      assert.ok(m.description);
      assert.ok(String(m.alternates?.canonical).includes(`/${locale}`));
      assert.equal(Object.keys(m.alternates?.languages || {}).length, 4);
    }
  assert.equal(locales.length * paths.length, 48);
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
