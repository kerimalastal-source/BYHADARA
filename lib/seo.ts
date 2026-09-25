import type { Metadata } from 'next';
import { dictionary, site, locales, businessIds, marketIds, type Locale } from '@/content/site';
import { seo } from '@/content/seo';
import { findArticle, publishedArticles } from '@/content/articles';

const ogLocale = { en: 'en_US', ar: 'ar_AR', tr: 'tr_TR' } as const;
const shareAlt = {
  en: 'BYHADARA Group – Istanbul investment and business development group',
  ar: 'مجموعة باي حضارة – مجموعة للاستثمار وتطوير الأعمال في إسطنبول',
  tr: 'BYHADARA Group – İstanbul merkezli yatırım ve iş geliştirme grubu',
} as const;
const pageUrl = (locale: Locale, path: string) =>
  `${site.origin}/${locale}${path ? '/' + path : ''}`;

/** Search title and description for a route, or undefined when the route does not exist. */
export function pageSeo(locale: Locale, path: string) {
  if (path.startsWith('insights/')) {
    const a = findArticle(path.slice(9));
    if (!a) return undefined;
    const t = a.translations[locale];
    return { title: `${t.title} | ${site.name}`, description: t.description };
  }
  return seo[locale][path];
}

/**
 * The insights index stays out of search results until it has something to list, and the
 * thank-you page shown after a sent request never appears in them.
 */
export const isIndexable = (path: string) =>
  path === 'insights' ? publishedArticles().length > 0 : path !== 'contact/thank-you';

export type Crumb = { name: string; href?: string };
/** Breadcrumb trail after "Home" for an existing route; the last item is the current page. */
export function breadcrumbs(locale: Locale, path: string): Crumb[] {
  const d = dictionary(locale);
  const [section, id] = path.split('/');
  const sections: Record<string, string> = {
    about: d.nav[1],
    businesses: d.nav[2],
    markets: d.nav[3],
    partnerships: d.nav[4],
    inquiries: d.nav[4],
    insights: d.nav[5],
    contact: d.contact,
    privacy: d.privacy,
    terms: d.terms,
  };
  if (!id) return [{ name: sections[section] }];
  const parent = {
    name: sections[section],
    href: `/${locale}/${section === 'inquiries' ? 'partnerships' : section}`,
  };
  let name = '';
  if (section === 'businesses')
    name = d.business[businessIds.indexOf(id as (typeof businessIds)[number])].name;
  else if (section === 'markets')
    name = d.market[marketIds.indexOf(id as (typeof marketIds)[number])].name;
  else if (section === 'inquiries') name = id === 'investment' ? d.investmentCta : d.partnershipCta;
  else if (section === 'insights') name = findArticle(id)?.translations[locale].title || '';
  else if (section === 'contact') name = d.thanksLabel;
  return [parent, { name }];
}

function verification(): Metadata['verification'] {
  const { GOOGLE_SITE_VERIFICATION: google, BING_SITE_VERIFICATION: bing } = process.env;
  const { YANDEX_VERIFICATION: yandex } = process.env;
  if (!google && !bing && !yandex) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  };
}

export function metadataFor(locale: Locale, path: string): Metadata {
  const page = pageSeo(locale, path);
  if (!page)
    return {
      title: `${dictionary(locale).notFound} | ${site.name}`,
      robots: { index: false, follow: true },
    };
  const url = pageUrl(locale, path);
  const languages = Object.fromEntries(locales.map((l) => [l, pageUrl(l, path)]));
  const article = path.startsWith('insights/') ? findArticle(path.slice(9)) : undefined;
  const t = article?.translations[locale];
  const image = t?.image
    ? { url: t.image, alt: t.imageAlt || t.title }
    : { url: `/og/byhadara-${locale}.jpg`, width: 1200, height: 630, alt: shareAlt[locale] };
  const preview = process.env.VERCEL_ENV === 'preview';
  return {
    metadataBase: new URL(site.origin),
    title: page.title,
    description: page.description,
    applicationName: site.name,
    alternates: { canonical: url, languages: { ...languages, 'x-default': languages.en } },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    },
    openGraph: {
      type: article ? 'article' : 'website',
      ...(article ? { publishedTime: article.publishedAt } : {}),
      title: page.title,
      description: page.description,
      url,
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [image.url],
    },
    robots:
      preview || !isIndexable(path)
        ? { index: false, follow: !preview }
        : {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-image-preview': 'large',
              'max-snippet': -1,
              'max-video-preview': -1,
            },
          },
    verification: verification(),
  };
}

/** schema.org graph for a route: organization, website, page, breadcrumbs and article. */
export function structuredData(locale: Locale, path: string) {
  const page = pageSeo(locale, path);
  if (!page) return null;
  const d = dictionary(locale);
  const url = pageUrl(locale, path);
  const org = { '@id': `${site.origin}/#organization` };
  const website = { '@id': `${site.origin}/#website` };
  const crumbs = path ? breadcrumbs(locale, path) : [];
  const article = path.startsWith('insights/') ? findArticle(path.slice(9)) : undefined;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      ...org,
      name: site.name,
      legalName: site.legalName,
      alternateName: ['BYHADARA', 'مجموعة باي حضارة'],
      url: site.origin,
      logo: { '@type': 'ImageObject', url: `${site.origin}/icon-512.png`, width: 512, height: 512 },
      description: seo.en[''].description,
      email: site.email,
      telephone: site.phone,
      address: { '@type': 'PostalAddress', addressLocality: 'Istanbul', addressCountry: 'TR' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'business inquiries',
        email: site.email,
        telephone: site.phone,
        availableLanguage: ['English', 'Arabic', 'Turkish'],
      },
      subOrganization: businessIds.map((id) => ({ '@id': `${site.origin}/#${id}` })),
    },
    ...businessIds.map((id, i) => ({
      '@type': 'Organization',
      '@id': `${site.origin}/#${id}`,
      name: dictionary('en').business[i].name,
      alternateName: dictionary('ar').business[i].name,
      url: id === 'real-estate' ? site.realEstate : site.hospitality,
      logo: `${site.origin}/images/hadara-mark.png`,
      parentOrganization: org,
    })),
    {
      '@type': 'WebSite',
      ...website,
      url: site.origin,
      name: site.name,
      alternateName: 'مجموعة باي حضارة',
      inLanguage: [...locales],
      publisher: org,
    },
    {
      '@type':
        path === 'about'
          ? 'AboutPage'
          : path === 'contact'
            ? 'ContactPage'
            : path === 'insights'
              ? 'CollectionPage'
              : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: locale,
      isPartOf: website,
      ...(path === '' || path === 'about'
        ? { about: org }
        : path.startsWith('businesses/')
          ? { about: { '@id': `${site.origin}/#${path.slice(11)}` } }
          : {}),
      ...(crumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    },
  ];
  if (crumbs.length)
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [{ name: d.home, href: `/${locale}` }, ...crumbs].map((c, i, all) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: i === all.length - 1 ? url : `${site.origin}${c.href}`,
      })),
    });
  if (article) {
    const t = article.translations[locale];
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: t.title,
      description: t.description,
      datePublished: article.publishedAt,
      inLanguage: locale,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      author: org,
      publisher: org,
      ...(t.image ? { image: `${site.origin}${t.image}` } : {}),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
