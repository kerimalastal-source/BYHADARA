import type { Locale } from './site';
export const categoryIds = [
  'corporate',
  'investment',
  'real-estate',
  'hospitality',
  'turkiye',
  'gcc',
  'egypt',
  'trade',
] as const;
export type ArticleTranslation = {
  title: string;
  description: string;
  body: string[];
  image?: string;
  imageAlt?: string;
};
export type Article = {
  slug: string;
  category: (typeof categoryIds)[number];
  status: 'draft' | 'published';
  publishedAt: string;
  approved: boolean;
  translations: Record<Locale, ArticleTranslation>;
};
/** Publish only approved articles with complete translations. No fabricated starter news. */
export const articles: Article[] = [];
export function publishedArticles() {
  return articles
    .filter(
      (a) => a.status === 'published' && a.approved && Date.parse(a.publishedAt) <= Date.now(),
    )
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}
export function findArticle(slug: string) {
  return publishedArticles().find((a) => a.slug === slug);
}
