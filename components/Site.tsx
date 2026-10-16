import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Brand, Wordmark } from './Brand';
import { LanguageLinks } from './LanguageLinks';
import { latestNews, categoryIds, type Article } from '@/content/articles';
import { partnerLogoSize, partners } from '@/content/partners';
import { dictionary, navPaths, businessIds, marketIds, site, type Locale } from '@/content/site';
export const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    ↗
  </span>
);
export function Button({
  href,
  children,
  light = false,
  outline = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  outline?: boolean;
}) {
  return (
    <Link className={`button${light ? ' light' : ''}${outline ? ' outline' : ''}`} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span aria-hidden="true" />
      {children}
    </div>
  );
}
export function Photo({
  name,
  alt,
  className = '',
  priority = false,
  sizes,
}: {
  /** A file under public/images, or an absolute URL from an allowed remote host. */
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={name.startsWith('https://') ? name : `/images/${name}`}
        alt={alt}
        fill
        sizes={sizes ?? (className.includes('hero') ? '100vw' : '(max-width: 720px) 100vw, 50vw')}
        priority={priority}
      />
    </div>
  );
}
export function FinalCTA({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <section className="final-cta">
      <div className="container cta-inner">
        <div>
          <Label>{d.partnerships}</Label>
          <h2>{d.ctaTitle}</h2>
        </div>
        <div>
          <p>{d.ctaText}</p>
          <Button href={`/${locale}/contact`} light>
            {d.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <Brand locale={locale} />
          <p>{d.footer}</p>
          <span className="footer-location">{d.based}</span>
          <a
            className="footer-social"
            href={site.linkedin}
            target="_blank"
            rel="noopener"
            aria-label={d.linkedinLabel}
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        </div>
        <div>
          <h3>{d.quickLinks}</h3>
          {navPaths.slice(1).map((p, i) => (
            <Link key={p} href={`/${locale}/${p}`}>
              {d.nav[i + 1]}
            </Link>
          ))}
        </div>
        <div>
          <h3>{d.businesses}</h3>
          {businessIds.map((id, i) => (
            <Link key={id} href={`/${locale}/businesses/${id}`}>
              {d.business[i].name}
            </Link>
          ))}
          <Link href={`/${locale}/contact`}>{d.contact}</Link>
          {site.email && (
            <a href={`mailto:${site.email}`}>
              <span dir="ltr">{site.email}</span>
            </a>
          )}
          {site.phone && (
            <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
              <span dir="ltr">{site.phone}</span>
            </a>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} <bdi>BYHADARA Group.</bdi> {d.rights}
        </p>
        <div>
          <Link href={`/${locale}/privacy`}>{d.privacy}</Link>
          <Link href={`/${locale}/terms`}>{d.terms}</Link>
          <LanguageLinks label={d.language} />
        </div>
      </div>
      <p className="legal-identity">{d.legalIdentity}</p>
    </footer>
  );
}
/** LinkedIn's "in" mark (Simple Icons, CC0), drawn in the current text colour. */
export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}
/** The group and its two companies: BYHADARA Group above large panels linking to each company. */
export function Companies({ locale, heading = false }: { locale: Locale; heading?: boolean }) {
  const d = dictionary(locale),
    Title = heading ? 'h3' : 'h2';
  return (
    <>
      {heading && (
        <div className="group-head">
          <Label>{d.groupLabel}</Label>
          <h2>{d.groupTitle}</h2>
          <p>{d.groupText}</p>
        </div>
      )}
      <div className="group-tree" aria-hidden="true">
        <span className="group-node" lang="en" translate="no">
          <Wordmark />
        </span>
      </div>
      <div className="company-grid">
        {d.business.map((b, i) => (
          <div className="company-branch" key={b.name}>
            <Link href={`/${locale}/businesses/${businessIds[i]}`} className="company-panel">
              <Photo name={b.panelImage} alt="" sizes="(max-width: 640px) 100vw, 50vw" />
              <HadaraMark className="company-mark" />
              <span className="company-index" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="company-body">
                <span className="company-sector">{b.sector}</span>
                <Title>{b.name}</Title>
                <span className="company-desc">{b.desc}</span>
                <span className="company-cta">
                  {d.learn}
                  <Arrow />
                </span>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
/** The gold HADARA monogram shared by the group companies. */
export function HadaraMark({ className }: { className?: string }) {
  return (
    <Image src="/images/hadara-mark.png" alt="" width={196} height={240} className={className} />
  );
}
/** Success partners of the group companies, shown as a single calm row of logos. */
export function Partners({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <section className="section partners-section">
      <div className="container">
        <div className="group-head">
          <Label>{d.partnersLabel}</Label>
          <h2>{d.partnersTitle}</h2>
          <p>{d.partnersText}</p>
        </div>
        <ul className="partners-grid">
          {partners.map((p) => {
            const { width, height } = partnerLogoSize(p);
            const size = { '--logo-w': `${width}px`, '--logo-h': `${height}px` } as CSSProperties;
            return (
              <li key={p.name} className="partner-logo">
                <Image
                  src={`/images/${p.logo}`}
                  alt={p.name}
                  width={width}
                  height={height}
                  style={size}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
export function Markets({
  locale,
  compact = false,
  except,
}: {
  locale: Locale;
  compact?: boolean;
  /** Market left out, on that market's own page. */
  except?: (typeof marketIds)[number];
}) {
  const d = dictionary(locale);
  return (
    <div className={`markets-grid${compact ? ' compact' : ''}${except ? ' pair' : ''}`}>
      {d.market.map((m, i) =>
        marketIds[i] === except ? null : (
          <Link key={m.name} href={`/${locale}/markets/${marketIds[i]}`} className="market-card">
            <span className="market-number">0{i + 1}</span>
            <div className="market-heading">
              <h3>{m.name}</h3>
              <Arrow />
            </div>
            <p className="market-status">{m.status}</p>
            {!compact && <p>{m.desc}</p>}
          </Link>
        ),
      )}
    </div>
  );
}
export function Breadcrumb({
  locale,
  trail,
}: {
  locale: Locale;
  trail: { name: string; href?: string }[];
}) {
  const d = dictionary(locale);
  return (
    <nav className="breadcrumb" aria-label={d.breadcrumb}>
      <Link href={`/${locale}`}>{d.home}</Link>
      {trail.map((c) => (
        <Fragment key={c.name}>
          <span aria-hidden="true">/</span>
          {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
export function PageHero({
  locale,
  trail,
  label,
  title,
  intro,
}: {
  locale: Locale;
  trail: { name: string; href?: string }[];
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="page-hero container">
      <Breadcrumb locale={locale} trail={trail} />
      <Label>{label}</Label>
      <h1>{title}</h1>
      <p>{intro}</p>
    </section>
  );
}
export function Home({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <section className="hero">
        <Photo
          name="istanbul-bosphorus.jpg"
          alt={
            locale === 'ar'
              ? 'جسر فوق مضيق البوسفور في إسطنبول'
              : locale === 'tr'
                ? 'İstanbul Boğazı üzerinde bir köprü'
                : 'Bridge across the Bosphorus in Istanbul'
          }
          className="hero-photo"
          priority
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <Label>{d.location}</Label>
          <h1>
            {d.hero[0]}
            <br />
            <span>{d.hero[1]}</span>
          </h1>
          <p>{d.intro}</p>
          <div className="buttons">
            <Button href="#companies" light>
              {d.explore}
            </Button>
            <Link className="hero-link" href={`/${locale}/about`}>
              {d.discover}
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>{d.scroll}</span>
          <span className="hero-coordinate" dir="ltr">
            41°00′ N &nbsp; 28°58′ E
          </span>
          <a href="#companies" aria-label={d.groupLabel} className="scroll-arrow">
            ↓
          </a>
        </div>
      </section>
      <section className="section group-section" id="companies">
        <div className="container">
          <Companies locale={locale} heading />
        </div>
      </section>
      <Partners locale={locale} />
      {latestNews().length > 0 && (
        <section className="insights-section section">
          <div className="container">
            <div className="section-head">
              <div>
                <Label>{d.news}</Label>
                <h2>{d.newsTitle}</h2>
              </div>
              <Link className="text-link" href={`/${locale}/insights`}>
                {d.allNews}
                <Arrow />
              </Link>
            </div>
            <ArticleCards locale={locale} articles={latestNews()} />
          </div>
        </section>
      )}
      <section className="container section">
        <div className="section-head">
          <div>
            <Label>{d.markets}</Label>
            <h2>{d.marketsTitle}</h2>
          </div>
          <Link href={`/${locale}/markets`} className="text-link">
            {d.marketsCta}
            <Arrow />
          </Link>
        </div>
        <Markets locale={locale} compact />
      </section>
      <section className="vision-section">
        <div className="container vision-inner">
          <Label>{d.vision}</Label>
          <div>
            <h2>{d.visionTitle}</h2>
            <p>{d.visionText}</p>
            <Link className="text-link" href={`/${locale}/about`}>
              {d.discover}
              <Arrow />
            </Link>
          </div>
          <span className="vision-word" aria-hidden="true">
            B.
          </span>
        </div>
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}

/** Article cards without search or filters, for the homepage and related articles. */
export function ArticleCards({ locale, articles }: { locale: Locale; articles: Article[] }) {
  const d = dictionary(locale);
  return (
    <div className="article-list">
      {articles.map((a) => {
        const t = a.translations[locale];
        return (
          <article className="article-card" key={a.slug}>
            {t.image && (
              <Photo
                name={t.image.replace('/images/', '')}
                alt={t.imageAlt || t.title}
                sizes="(max-width: 640px) 100vw, 33vw"
              />
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
            <h3>
              <Link href={`/${locale}/insights/${a.slug}`}>{t.title}</Link>
            </h3>
            <p>{t.description}</p>
            <Link
              className="text-link"
              href={`/${locale}/insights/${a.slug}`}
              aria-label={`${d.read}: ${t.title}`}
            >
              {d.read}
              <Arrow />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
