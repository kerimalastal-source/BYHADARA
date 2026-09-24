import type { MetadataRoute } from 'next';
import { locales, paths, site } from '@/content/site';
import { publishedArticles } from '@/content/articles';
import { isIndexable } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = publishedArticles().map((a) => ({
    path: `insights/${a.slug}`,
    lastModified: a.publishedAt,
  }));
  return [...paths.filter(isIndexable).map((path) => ({ path })), ...articles].flatMap((page) =>
    locales.map((locale) => ({
      url: `${site.origin}/${locale}${page.path ? '/' + page.path : ''}`,
      ...('lastModified' in page ? { lastModified: page.lastModified } : {}),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.origin}/${l}${page.path ? '/' + page.path : ''}`]),
        ),
      },
      changeFrequency: 'monthly' as const,
      priority: page.path ? 0.7 : 1,
    })),
  );
}
