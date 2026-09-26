import type { Locale } from './site';
import type { CompanyId } from './companies';
import { news } from './articles/news';
import { realEstate } from './articles/real-estate';
import { hospitality } from './articles/hospitality';
import { categoryIds, type ArticleCard } from './article-categories';
export { categoryIds, type ArticleCard };
export type ArticleImage = { src: string; alt: string };
export type ArticleTranslation = {
  /** Headline shown on the page and on article cards. */
  title: string;
  /** Shorter headline for search results, when the title is too long for them. */
  seoTitle?: string;
  description: string;
  /** Paragraphs; the first one is set as the lead. */
  body: string[];
  image?: string;
  imageAlt?: string;
  /** Source of the article's visuals, shown under the main image. */
  imageCredit?: string;
  /** Key figures as [value, label]. */
  facts?: [string, string][];
  gallery?: ArticleImage[];
  /** Closing call to action; an href starting with "/" stays on this website. */
  cta?: { title: string; text: string; label: string; href: string };
};
export type Article = {
  slug: string;
  category: (typeof categoryIds)[number];
  status: 'draft' | 'published';
  publishedAt: string;
  approved: boolean;
  /** Group company the article is about, introduced at the end of the article. */
  company?: CompanyId;
  translations: Record<Locale, ArticleTranslation>;
};
/**
 * Publish only approved articles with complete translations. No fabricated news: company facts
 * come from the group companies' own pages, market and industry facts from their vetted guides
 * (see docs/ASSETS.md for the visuals). Articles with the same date keep this order.
 */
export const articles: Article[] = [...news, ...realEstate, ...hospitality];
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
/** Card data for one article in one language, the only article data sent to the browser. */
export function articleCard(a: Article, locale: Locale): ArticleCard {
  const { title, description, image, imageAlt } = a.translations[locale];
  return {
    slug: a.slug,
    category: a.category,
    publishedAt: a.publishedAt,
    title,
    description,
    image,
    imageAlt,
  };
}
