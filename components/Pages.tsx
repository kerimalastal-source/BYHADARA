import Link from 'next/link';
import { dictionary, businessIds, marketIds, site, type Locale } from '@/content/site';
import { findArticle, publishedArticles, categoryIds } from '@/content/articles';
import { Arrow, Button, Label, Photo, Businesses, Markets, FinalCTA, PageHero } from './Site';
import { InquiryForm } from './InquiryForm';
import { Insights } from './Insights';
import { inquiriesEnabled } from '@/lib/inquiry-config';
import { notFound } from 'next/navigation';
export function About({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <PageHero locale={locale} label={d.nav[1]} title={d.aboutTitle} intro={d.aboutIntro} />
      <div className="container">
        <Photo name="istanbul.jpg" alt={d.based} className="detail-image" />
      </div>
      <section className="container section prose-grid">
        <div>
          <Label>{d.who}</Label>
          <h2>{d.whoTitle}</h2>
        </div>
        <div>
          <p className="lead">{d.whoText}</p>
          <p>{d.whoMore}</p>
        </div>
      </section>
      <section className="businesses-section section">
        <div className="container">
          <div className="prose-grid">
            <div>
              <Label>{d.vision}</Label>
              <h2>{d.visionTitle}</h2>
              <p>{d.visionText}</p>
            </div>
            <div>
              <h3>{d.mission}</h3>
              <p>{d.missionText}</p>
              <h3 style={{ marginTop: 35 }}>{d.purpose}</h3>
              <p>{d.purposeText}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container section">
        <h2>{d.values}</h2>
        <div className="values-grid">
          {d.valueList.map((v, i) => (
            <div className="value" key={v}>
              <span>0{i + 1}</span>
              <h3>{v}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="container body-section prose-grid">
        <div>
          <h2>{d.philosophy}</h2>
          <p>{d.philosophyText}</p>
        </div>
        <div>
          <h2>{d.growth}</h2>
          <p>{d.growthText}</p>
        </div>
      </section>
      <section className="container body-section">
        <div className="section-head">
          <h2>{d.businessesTitle}</h2>
        </div>
        <Businesses locale={locale} />
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}
export function BusinessIndex({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        label={d.nav[2]}
        title={d.businessesTitle}
        intro={d.businessIntro}
      />
      <section className="container body-section">
        <Businesses locale={locale} />
        <p className="image-note">{d.imageNote}</p>
      </section>
      <section className="container body-section prose-grid">
        <h2>{d.philosophy}</h2>
        <div>
          <p>{d.philosophyText}</p>
          <p>{d.legalIdentity}</p>
        </div>
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}
export function BusinessDetail({ locale, id }: { locale: Locale; id: string }) {
  const index = businessIds.indexOf(id as (typeof businessIds)[number]);
  if (index < 0) notFound();
  const d = dictionary(locale),
    b = d.business[index],
    url = index === 1 ? site.hospitality : site.realEstate;
  return (
    <>
      <PageHero locale={locale} label={b.sector} title={b.name} intro={b.desc} />
      <div className="container">
        <Photo name={b.image} alt={b.alt} className="detail-image" />
        <p className="image-note">{d.imageNote}</p>
      </div>
      <section className="container section prose-grid">
        <div>
          <Label>{d.businesses}</Label>
          <h2>{b.name}</h2>
          <p>{b.detail}</p>
          <div style={{ marginTop: 25 }}>
            {url ? (
              <a className="button" href={url} target="_blank" rel="noopener noreferrer">
                {d.official}
                <Arrow />
              </a>
            ) : (
              <p className="notice">{d.officialPending}</p>
            )}
          </div>
        </div>
        <div>
          <h3>{d.specializations}</h3>
          <ul className="detail-list">
            {b.areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3>{d.targetMarkets}</h3>
          <p>{b.markets}</p>
          <Link className="text-link" href={`/${locale}/inquiries/partnership`}>
            {d.partnershipCta}
            <Arrow />
          </Link>
        </div>
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}
export function MarketIndex({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <PageHero locale={locale} label={d.nav[3]} title={d.marketsTitle} intro={d.marketsIntro} />
      <div className="container">
        <Photo name="istanbul.jpg" alt={d.based} className="detail-image" />
      </div>
      <section className="container body-section">
        <Markets locale={locale} />
        <p className="notice" style={{ marginTop: 45 }}>
          {d.marketNote}
        </p>
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}
export function MarketDetail({ locale, id }: { locale: Locale; id: string }) {
  const i = marketIds.indexOf(id as (typeof marketIds)[number]);
  if (i < 0) notFound();
  const d = dictionary(locale),
    m = d.market[i];
  return (
    <>
      <PageHero locale={locale} label={m.status} title={m.name} intro={m.desc} />
      <section className="container body-section prose-grid">
        <div>
          <Label>{d.markets}</Label>
          <h2>{d.strategicInterest}</h2>
          <p>{m.interest}</p>
        </div>
        <div>
          <h3>{d.targetMarkets}</h3>
          <p>{m.sectors}</p>
          <p className="notice">{d.marketNote}</p>
          <Link className="text-link" href={`/${locale}/inquiries/partnership`}>
            {d.partnershipCta}
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="container body-section">
        <Markets locale={locale} />
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}
export function Partnerships({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        label={d.nav[4]}
        title={d.partnershipHero}
        intro={d.partnershipIntro}
      />
      <section className="container body-section">
        {d.partnershipTypes.map((p, i) => (
          <article className="editorial-row" key={p}>
            <span className="row-number">0{i + 1}</span>
            <h2 style={{ fontSize: 28 }}>{p}</h2>
            <div>
              <p>{d.partnershipDescriptions[i]}</p>
              <Link
                className="text-link"
                href={`/${locale}/inquiries/${i === 0 ? 'investment' : 'partnership'}`}
              >
                {i === 0 ? d.investmentCta : d.partnershipCta}
                <Arrow />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}
export function Contact({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <PageHero locale={locale} label={d.contact} title={d.contactTitle} intro={d.contactIntro} />
      <section className="container body-section">
        <div className="contact-grid">
          <div className="contact-panel">
            <Label>{d.partnerships}</Label>
            <h2>{d.investmentCta}</h2>
            <p>{d.partnershipDescriptions[0]}</p>
            <Button href={`/${locale}/inquiries/investment`}>{d.investmentCta}</Button>
          </div>
          <div className="contact-panel">
            <Label>{d.partnerships}</Label>
            <h2>{d.partnershipCta}</h2>
            <p>{d.partnershipIntro}</p>
            <Button href={`/${locale}/inquiries/partnership`}>{d.partnershipCta}</Button>
          </div>
        </div>
      </section>
      <section className="container body-section prose-grid">
        <div>
          <Label>{d.based}</Label>
          <h2>{d.direct}</h2>
          <p>{d.directText}</p>
          <a
            className="text-link"
            href={site.hospitality}
            target="_blank"
            rel="noopener noreferrer"
          >
            {d.business[1].name}
            <Arrow />
          </a>
        </div>
        <div>
          {site.email && (
            <p>
              <a dir="ltr" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          )}
          {site.phone && (
            <p>
              <a dir="ltr" href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
                {site.phone}
              </a>
            </p>
          )}
          <p>{d.legalIdentity}</p>
        </div>
      </section>
    </>
  );
}
export function InquiryPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: 'investment' | 'partnership';
}) {
  const d = dictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        label={d.partnerships}
        title={kind === 'investment' ? d.investmentTitle : d.partnershipFormTitle}
        intro={d.formIntro}
      />
      <section className="container body-section form-shell">
        <aside className="form-aside">
          <h2>{d.partnershipsTitle}</h2>
          <p>{d.partnershipIntro}</p>
          <p className="notice" style={{ marginTop: 25 }}>
            {d.formDisclaimer}
          </p>
          <Link href={`/${locale}/privacy`} className="text-link">
            {d.privacy}
            <Arrow />
          </Link>
        </aside>
        <InquiryForm
          locale={locale}
          kind={kind}
          enabled={inquiriesEnabled()}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
        />
      </section>
    </>
  );
}
export function InsightIndex({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        label={d.insights}
        title={d.insightsTitle}
        intro={d.insightsIntro}
      />
      <section className="container body-section">
        <Insights locale={locale} articles={publishedArticles()} />
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}
export function ArticlePage({ locale, slug }: { locale: Locale; slug: string }) {
  const a = findArticle(slug);
  if (!a) notFound();
  const d = dictionary(locale),
    t = a.translations[locale],
    related = publishedArticles()
      .filter((b) => b.slug !== slug && b.category === a.category)
      .slice(0, 3);
  return (
    <>
      <PageHero
        locale={locale}
        label={d.categories[categoryIds.indexOf(a.category)]}
        title={t.title}
        intro={t.description}
      />
      <article className="container body-section article-body">
        <p className="article-meta">
          <bdi>BYHADARA Group</bdi> ·{' '}
          <time dateTime={a.publishedAt}>
            {new Date(a.publishedAt).toLocaleDateString(locale, {
              dateStyle: 'long',
              timeZone: 'UTC',
            })}
          </time>
        </p>
        {t.image && (
          <Photo
            name={t.image.replace('/images/', '')}
            alt={t.imageAlt || t.title}
            className="detail-image"
          />
        )}
        {t.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <Link className="text-link" href={`/${locale}/insights`}>
          {d.allInsights}
          <Arrow />
        </Link>
      </article>
      {related.length > 0 && (
        <section className="container body-section">
          <h2>{d.related}</h2>
          <Insights locale={locale} articles={related} />
        </section>
      )}
    </>
  );
}
export function Legal({ locale, kind }: { locale: Locale; kind: 'privacy' | 'terms' }) {
  const d = dictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        label={d.legalUpdated}
        title={d[kind]}
        intro={kind === 'privacy' ? d.privacyIntro : d.termsIntro}
      />
      <article className="container body-section legal-content">
        {(kind === 'privacy' ? d.privacySections : d.termsSections).map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
      </article>
    </>
  );
}
