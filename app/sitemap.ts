import type { MetadataRoute } from 'next';
import { locales, paths, site } from '@/content/site';
import { publishedArticles } from '@/content/articles';
export default function sitemap(): MetadataRoute.Sitemap {
  return [...paths, ...publishedArticles().map((a) => `insights/${a.slug}`)].flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.origin}/${locale}${path ? '/' + path : ''}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.origin}/${l}${path ? '/' + path : ''}`]),
        ),
      },
      changeFrequency: 'monthly' as const,
      priority: path ? 0.7 : 1,
    })),
  );
}
