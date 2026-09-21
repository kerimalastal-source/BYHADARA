'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dictionary, type Locale } from '@/content/site';
import { categoryIds, type Article } from '@/content/articles';
export function Insights({ locale, articles }: { locale: Locale; articles: Article[] }) {
  const d = dictionary(locale);
  const [query, setQuery] = useState(''),
    [category, setCategory] = useState('');
  const filtered = articles.filter(
    (a) =>
      (!category || a.category === category) &&
      `${a.translations[locale].title} ${a.translations[locale].description}`
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
          {filtered.map((a) => {
            const t = a.translations[locale];
            return (
              <article key={a.slug} className="article-card">
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
                  {d.categories[categoryIds.indexOf(a.category)]} ·{' '}
                  <time dateTime={a.publishedAt}>
                    {new Date(a.publishedAt).toLocaleDateString(locale, {
                      dateStyle: 'long',
                      timeZone: 'UTC',
                    })}
                  </time>
                </p>
                <h2>
                  <Link href={`/${locale}/insights/${a.slug}`}>{t.title}</Link>
                </h2>
                <p>{t.description}</p>
                <Link className="text-link" href={`/${locale}/insights/${a.slug}`}>
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
