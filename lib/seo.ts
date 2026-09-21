import type { Metadata } from 'next';
import { dictionary, site, locales, businessIds, marketIds, type Locale } from '@/content/site';
import { findArticle } from '@/content/articles';
export function pageInfo(locale: Locale, path: string) {
  const d = dictionary(locale);
  const routes: Record<string, [string, string]> = {
    '': [d.hero.join(' '), d.intro],
    about: [d.nav[1], d.aboutIntro],
    businesses: [d.nav[2], d.businessIntro],
    markets: [d.nav[3], d.marketsIntro],
    partnerships: [d.nav[4], d.partnershipIntro],
    insights: [d.nav[5], d.insightsIntro],
    contact: [d.contact, d.contactIntro],
    'inquiries/investment': [d.investmentTitle, d.formIntro],
    'inquiries/partnership': [d.partnershipFormTitle, d.formIntro],
    privacy: [d.privacy, d.privacyIntro],
    terms: [d.terms, d.termsIntro],
  };
  businessIds.forEach(
    (id, i) => (routes[`businesses/${id}`] = [d.business[i].name, d.business[i].desc]),
  );
  marketIds.forEach((id, i) => (routes[`markets/${id}`] = [d.market[i].name, d.market[i].desc]));
  if (path.startsWith('insights/')) {
    const a = findArticle(path.slice(9));
    if (a) {
      const t = a.translations[locale];
      return [t.title, t.description];
    }
  }
  return routes[path] || [d.notFound, d.notFoundText];
}
export function metadataFor(locale: Locale, path: string): Metadata {
  const [heading, description] = pageInfo(locale, path),
    title = `${heading.replace(/\n/g, ' ')} | BYHADARA Group`,
    url = `${site.origin}/${locale}${path ? '/' + path : ''}`;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${site.origin}/${l}${path ? '/' + path : ''}`]),
  );
  const article = path.startsWith('insights/') ? findArticle(path.slice(9)) : undefined;
  const preview = article?.translations[locale].image;
  return {
    metadataBase: new URL(site.origin),
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, 'x-default': languages.en } },
    icons: { icon: '/favicon.svg' },
    openGraph: {
      type: article ? 'article' : 'website',
      title,
      description,
      url,
      siteName: site.name,
      locale: { en: 'en_US', ar: 'ar_AR', tr: 'tr_TR' }[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ({ en: 'en_US', ar: 'ar_AR', tr: 'tr_TR' })[l]),
      ...(preview ? { images: [new URL(preview, site.origin).toString()] } : {}),
    },
    twitter: {
      card: preview ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(preview ? { images: [new URL(preview, site.origin).toString()] } : {}),
    },
    robots:
      process.env.VERCEL_ENV === 'preview'
        ? { index: false, follow: false }
        : { index: true, follow: true },
  };
}
