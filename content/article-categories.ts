/**
 * Article categories and the card data client components receive. Kept apart from
 * `articles.ts` so the browser never downloads the full text of every article.
 */
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
export type CategoryId = (typeof categoryIds)[number];
/** What an article card shows, in one language. */
export type ArticleCard = {
  slug: string;
  category: CategoryId;
  publishedAt: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};
