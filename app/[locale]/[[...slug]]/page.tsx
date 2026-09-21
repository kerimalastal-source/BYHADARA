import { notFound } from 'next/navigation';
import { Home } from '@/components/Site';
import {
  About,
  BusinessIndex,
  BusinessDetail,
  MarketIndex,
  MarketDetail,
  Partnerships,
  Contact,
  InquiryPage,
  InsightIndex,
  ArticlePage,
  Legal,
} from '@/components/Pages';
import { isLocale, locales, paths, site } from '@/content/site';
import { publishedArticles } from '@/content/articles';
import { metadataFor } from '@/lib/seo';
type Props = { params: Promise<{ locale: string; slug?: string[] }> };
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    [...paths, ...publishedArticles().map((a) => `insights/${a.slug}`)].map((path) => ({
      locale,
      slug: path ? path.split('/') : [],
    })),
  );
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  return metadataFor(locale, slug.join('/'));
}
export default async function Page({ params }: Props) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  const path = slug.join('/');
  if (!path) {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${site.origin}/#organization`,
          name: 'BYHADARA Group',
          url: site.origin,
          description:
            'Istanbul-based investment and business development group connecting independently registered companies.',
          location: { '@type': 'Place', name: 'Istanbul, Türkiye' },
        },
        {
          '@type': 'WebSite',
          '@id': `${site.origin}/#website`,
          url: site.origin,
          name: site.name,
          inLanguage: ['en', 'ar', 'tr'],
          publisher: { '@id': `${site.origin}/#organization` },
        },
      ],
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
        <Home locale={locale} />
      </>
    );
  }
  if (path === 'about') return <About locale={locale} />;
  if (path === 'businesses') return <BusinessIndex locale={locale} />;
  if (slug[0] === 'businesses' && slug.length === 2)
    return <BusinessDetail locale={locale} id={slug[1]} />;
  if (path === 'markets') return <MarketIndex locale={locale} />;
  if (slug[0] === 'markets' && slug.length === 2)
    return <MarketDetail locale={locale} id={slug[1]} />;
  if (path === 'partnerships') return <Partnerships locale={locale} />;
  if (path === 'contact') return <Contact locale={locale} />;
  if (path === 'insights') return <InsightIndex locale={locale} />;
  if (slug[0] === 'insights' && slug.length === 2)
    return <ArticlePage locale={locale} slug={slug[1]} />;
  if (path === 'inquiries/investment' || path === 'inquiries/partnership')
    return <InquiryPage locale={locale} kind={slug[1] as 'investment' | 'partnership'} />;
  if (path === 'privacy' || path === 'terms') return <Legal locale={locale} kind={path} />;
  notFound();
}
