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
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={`/images/${name}`}
        alt={alt}
        fill
        sizes={className.includes('hero') ? '100vw' : '(max-width: 720px) 100vw, 50vw'}
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
            <a href={`mailto:${site.email}`} dir="ltr">
              {site.email}
            </a>
          )}
          {site.phone && (
            <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} dir="ltr">
              {site.phone}
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
export function Businesses({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <div className="business-grid">
      {d.business.map((b, i) => (
        <article className="business-card" key={b.name}>
          <Link
            href={`/${locale}/businesses/${businessIds[i]}`}
            className="business-image"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Photo name={b.image} alt={b.alt} />
            <span className="business-index">0{i + 1} / BYHADARA</span>
          </Link>
          <div className="business-content">
            <p className="sector">{b.sector}</p>
            <h3>{b.name}</h3>
            <p>{b.desc}</p>
            <Link className="text-link" href={`/${locale}/businesses/${businessIds[i]}`}>
              {d.learn}
              <Arrow />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
export function Markets({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <div className="markets-grid">
      {d.market.map((m, i) => (
        <Link key={m.name} href={`/${locale}/markets/${marketIds[i]}`} className="market-card">
          <span className="market-number">0{i + 1}</span>
          <div className="market-heading">
            <h3>{m.name}</h3>
            <Arrow />
          </div>
          <p className="market-status">{m.status}</p>
          <p>{m.desc}</p>
        </Link>
      ))}
    </div>
  );
}
export function EmptyInsights({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <div className="editorial-empty">
      <span aria-hidden="true" className="editorial-mark">
        ↳
      </span>
      <div>
        <h3>{d.emptyTitle}</h3>
        <p>{d.emptyText}</p>
      </div>
    </div>
  );
}
export function PageHero({
  locale,
  label,
  title,
  intro,
}: {
  locale: Locale;
  label: string;
  title: string;
  intro: string;
}) {
  const d = dictionary(locale);
  return (
    <section className="page-hero container">
      <nav className="breadcrumb" aria-label={d.home}>
        <Link href={`/${locale}`}>{d.home}</Link>
        <span>/</span>
        <span>{label}</span>
      </nav>
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
          name="istanbul.jpg"
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
            <Button href={`/${locale}/businesses`} light>
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
          <a href="#introduction" aria-label={d.who} className="scroll-arrow">
            ↓
          </a>
        </div>
      </section>
      <section className="container section intro-grid" id="introduction">
        <Label>{d.who}</Label>
        <div>
          <h2>{d.whoTitle}</h2>
          <div className="intro-copy">
            <p className="lead">{d.whoText}</p>
            <p>{d.whoMore}</p>
          </div>
          <Link className="text-link" href={`/${locale}/about`}>
            {d.story}
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="section businesses-section">
        <div className="container">
          <div className="section-head">
            <div>
              <Label>{d.businesses}</Label>
              <h2>{d.businessesTitle}</h2>
            </div>
            <p>{d.businessIntro}</p>
          </div>
          <Businesses locale={locale} />
          <p className="image-note">{d.imageNote}</p>
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
        <Markets locale={locale} />
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
      <section className="container section partnership-home">
        <div>
          <Label>{d.partnerships}</Label>
          <h2>{d.partnershipsTitle}</h2>
        </div>
        <div>
          <p className="lead">{d.partnershipIntro}</p>
          <div className="partner-links">
            <Link href={`/${locale}/inquiries/investment`}>
              {d.investmentCta}
              <Arrow />
            </Link>
            <Link href={`/${locale}/inquiries/partnership`}>
              {d.partnershipCta}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
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
      <FinalCTA locale={locale} />
    </>
  );
}

export function LatestInsights({ locale }: { locale: Locale }) {
  const articles = publishedArticles().slice(0, 3),
    d = dictionary(locale);
  if (!articles.length) return <EmptyInsights locale={locale} />;
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
