'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/content/locales';
import { categoryIds, type ArticleCard } from '@/content/article-categories';
/** Labels the list needs, passed from the server so the dictionaries stay out of the browser. */
export type InsightsLabels = {
  search: string;
  allCategories: string;
  categories: string[];
  read: string;
  emptyTitle: string;
  emptyText: string;
  noResults: string;
};
/** Searchable, filterable list of article cards; receives only the visitor's language. */
export function Insights({
  locale,
  articles,
  labels: d,
}: {
  locale: Locale;
  articles: ArticleCard[];
  labels: InsightsLabels;
}) {
  const [query, setQuery] = useState(''),
    [category, setCategory] = useState('');
  const filtered = articles.filter(
    (a) =>
      (!category || a.category === category) &&
      `${a.title} ${a.description}`
        .toLocaleLowerCase(locale)
        .includes(query.toLocaleLowerCase(locale)),
  );
  return (
    <>
      <div className="filter-bar">
        <label className="sr-only" htmlFor="search">
          {d.search}
        </label>
        <input
          type="search"
          id="search"
          placeholder={d.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="sr-only" htmlFor="category">
          {d.allCategories}
        </label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">{d.allCategories}</option>
          {categoryIds.map((c, i) => (
            <option key={c} value={c}>
              {d.categories[i]}
            </option>
          ))}
        </select>
      </div>
      {filtered.length ? (
        <div className="article-list">
          {filtered.map((t) => {
            return (
              <article key={t.slug} className="article-card">
                {t.image && (
                  <div className="photo">
                    <Image
                      src={t.image}
                      alt={t.imageAlt || t.title}
                      fill
                      sizes="(max-width:640px) 100vw,33vw"
                    />
                  </div>
                )}
                <p className="article-meta">
                  {d.categories[categoryIds.indexOf(t.category)]} ·{' '}
                  <time dateTime={t.publishedAt}>
                    {new Date(t.publishedAt).toLocaleDateString(locale, {
                      dateStyle: 'long',
                      timeZone: 'UTC',
                    })}
                  </time>
                </p>
                <h2>
                  <Link href={`/${locale}/insights/${t.slug}`}>{t.title}</Link>
                </h2>
                <p>{t.description}</p>
                <Link
                  className="text-link"
                  href={`/${locale}/insights/${t.slug}`}
                  aria-label={`${d.read}: ${t.title}`}
                >
                  {d.read}
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="editorial-empty" role="status">
          <span className="editorial-mark" aria-hidden="true">
            ↳
          </span>
          <div>
            <h3>{query || category ? d.noResults : d.emptyTitle}</h3>
            <p>{!query && !category ? d.emptyText : ''}</p>
          </div>
        </div>
      )}
    </>
  );
}
