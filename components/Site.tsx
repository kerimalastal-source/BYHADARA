import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageLinks } from './LanguageLinks';
import { publishedArticles, categoryIds } from '@/content/articles';
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
          <Link href={`/${locale}`} className="brand">
            <span>BYHADARA.</span>
            <small>G R O U P</small>
          </Link>
          <p>{d.footer}</p>
          <span className="footer-location">{d.based}</span>
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
        <span className="group-node">
          <span>
            BYHADARA<span className="brand-dot">.</span>
          </span>
          <small>G R O U P</small>
        </span>
      </div>
      <div className="company-grid">
        {d.business.map((b, i) => (
          <div className="company-branch" key={b.name}>
            <Link href={`/${locale}/businesses/${businessIds[i]}`} className="company-panel">
              <Photo name={b.image} alt="" sizes="(max-width: 640px) 100vw, 50vw" />
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
      <p className="image-note">{d.imageNote}</p>
    </>
  );
}
/** The gold HADARA monogram shared by the group companies. */
export function HadaraMark({ className }: { className?: string }) {
  return (
    <Image src="/images/hadara-mark.png" alt="" width={196} height={240} className={className} />
  );
}
export function Markets({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const d = dictionary(locale);
  return (
    <div className={`markets-grid${compact ? ' compact' : ''}`}>
      {d.market.map((m, i) => (
        <Link key={m.name} href={`/${locale}/markets/${marketIds[i]}`} className="market-card">
          <span className="market-number">0{i + 1}</span>
          <div className="market-heading">
            <h3>{m.name}</h3>
            <Arrow />
          </div>
          <p className="market-status">{m.status}</p>
          {!compact && <p>{m.desc}</p>}
        </Link>
      ))}
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
      {publishedArticles().length > 0 && (
        <section className="insights-section section">
          <div className="container">
            <div className="section-head">
              <div>
                <Label>{d.insights}</Label>
                <h2>{d.insightsTitle}</h2>
              </div>
              <Link className="text-link" href={`/${locale}/insights`}>
                {d.allInsights}
                <Arrow />
              </Link>
            </div>
            <LatestInsights locale={locale} />
          </div>
        </section>
      )}
      <FinalCTA locale={locale} />
    </>
  );
}

export function LatestInsights({ locale }: { locale: Locale }) {
  const articles = publishedArticles().slice(0, 3),
    d = dictionary(locale);
  return (
    <div className="article-list">
      {articles.map((a) => {
        const t = a.translations[locale];
        return (
          <article className="article-card" key={a.slug}>
            {t.image && (
              <Photo name={t.image.replace('/images/', '')} alt={t.imageAlt || t.title} />
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
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <Link className="text-link" href={`/${locale}/insights/${a.slug}`}>
              {d.read}
              <Arrow />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
