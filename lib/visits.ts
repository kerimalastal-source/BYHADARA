import { paths } from '@/content/site';
import { isLocale, type Locale } from '@/content/locales';
import { publishedArticles } from '@/content/articles';
import { databaseUrl, db } from './db';
import { escapeHtml } from './html';
/**
 * Anonymous page view. Nothing here identifies a person: the session is a random UUID kept in the
 * tab's sessionStorage (no cookie), the place comes from Vercel's geolocation headers, and neither
 * the IP address nor the user agent is stored.
 */
export type Visit = {
  sessionId: string;
  path: string;
  locale: Locale;
  /** Origin of the referring website (scheme and host only), or null for a direct visit. */
  referrer: string | null;
  /** ISO 3166-1 alpha-2 code. */
  country: string | null;
  city: string | null;
};
/** Visits are counted on the production deployment only (never previews), once a database exists. */
export const visitTrackingEnabled = () =>
  Boolean(databaseUrl()) && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production');
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
/** Crawlers and automated browsers are not visitors. */
export const isBot = (userAgent: string | null) =>
  !userAgent ||
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|facebookexternalhit/i.test(
    userAgent,
  );
/**
 * The locale of a public page of this website, or null for anything else: API, internal and admin
 * paths, unknown pages and unpublished articles are never counted.
 */
export function publicPageLocale(path: string): Locale | null {
  const [empty, locale, ...rest] = path.split('/');
  if (empty !== '' || !isLocale(locale)) return null;
  const page = rest.join('/');
  const pages = [...paths, ...publishedArticles().map((a) => `insights/${a.slug}`)];
  return pages.includes(page) ? locale : null;
}
/** Keeps only the referring website (scheme and host), never the page or query it came from. */
export function referrerOrigin(value: unknown) {
  if (typeof value !== 'string' || !value || value.length > 2000) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.origin : null;
  } catch {
    return null;
  }
}
/** Approximate place from Vercel's geolocation headers; the city arrives URL-encoded. */
export function visitorPlace(headers: Headers) {
  const country = headers.get('x-vercel-ip-country')?.trim().toUpperCase() ?? '';
  const raw = headers.get('x-vercel-ip-city') ?? '';
  let city = raw;
  try {
    city = decodeURIComponent(raw);
  } catch {
    // Malformed encoding: keep the header as it came.
  }
  city = city
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, 100);
  return { country: /^[A-Z]{2}$/.test(country) ? country : null, city: city || null };
}
/**
 * The visit described by a beacon, `undefined` for a malformed beacon, or null for a well-formed
 * beacon from a page that is not counted.
 */
export function parseVisit(body: unknown, headers: Headers): Visit | null | undefined {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return undefined;
  const { sessionId, path, locale, referrer } = body as Record<string, unknown>;
  if (typeof sessionId !== 'string' || !UUID.test(sessionId)) return undefined;
  if (typeof path !== 'string' || !path.startsWith('/') || path.length > 300) return undefined;
  const pageLocale = publicPageLocale(path);
  if (!pageLocale) return null;
  if (locale !== undefined && locale !== null && locale !== pageLocale) return undefined;
  return {
    sessionId: sessionId.toLowerCase(),
    path,
    locale: pageLocale,
    referrer: referrerOrigin(referrer),
    ...visitorPlace(headers),
  };
}
/** The table and its indexes; created automatically the first time a visit is saved. */
export const visitorEventsSchema = [
  `CREATE TABLE IF NOT EXISTS visitor_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  session_id text NOT NULL,
  path text NOT NULL,
  locale text,
  referrer text,
  country text,
  city text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
)`,
  'CREATE INDEX IF NOT EXISTS visitor_events_session_id_idx ON visitor_events USING btree (session_id)',
  'CREATE INDEX IF NOT EXISTS visitor_events_created_at_idx ON visitor_events USING btree (created_at)',
];
/**
 * Saves the visit and reports whether it opened a new session (no earlier event with its session
 * id). Both happen in one statement, whose snapshot cannot see the row it inserts.
 */
export async function recordVisit(visit: Visit) {
  const sql = db();
  const save = () => sql`
    WITH prior AS (SELECT 1 FROM visitor_events WHERE session_id = ${visit.sessionId} LIMIT 1),
    saved AS (
      INSERT INTO visitor_events (session_id, path, locale, referrer, country, city)
      VALUES (${visit.sessionId}, ${visit.path}, ${visit.locale}, ${visit.referrer},
        ${visit.country}, ${visit.city})
      RETURNING id
    )
    SELECT NOT EXISTS (SELECT 1 FROM prior) AS first FROM saved`;
  let rows: Record<string, unknown>[];
  try {
    rows = await save();
  } catch (error) {
    // 42P01: the table does not exist yet in a new database.
    if ((error as { code?: string }).code !== '42P01') throw error;
    await sql
      .transaction(visitorEventsSchema.map((statement) => sql.query(statement)))
      .catch(() => {
        // Another request may have created it at the same moment; saving again tells.
      });
    rows = await save();
  }
  return rows[0]?.first === true;
}
/** Deletes events older than 30 days. */
export async function removeOldVisits() {
  await db()`DELETE FROM visitor_events WHERE created_at < now() - interval '30 days'`;
}
const languages: Record<Locale, string> = { en: 'الإنجليزية', ar: 'العربية', tr: 'التركية' };
/** The Telegram alert for a new visitor, in Arabic (parse_mode HTML, every value escaped). */
export function newVisitorMessage(visit: Visit) {
  let country = visit.country;
  if (country) {
    try {
      country = new Intl.DisplayNames(['ar'], { type: 'region' }).of(country) ?? country;
    } catch {
      // Unknown code: keep it as it is.
    }
  }
  const place = [visit.city, country].filter(Boolean).join('، ') || 'غير معروف';
  const source = visit.referrer ? new URL(visit.referrer).host.replace(/^www\./, '') : 'مباشر';
  return [
    '🌐 BYHADARA — زائر جديد',
    `📍 من: ${escapeHtml(place)}`,
    `📄 الصفحة: ${escapeHtml(visit.path)}`,
    `🗣 اللغة: ${languages[visit.locale]}`,
    `↩️ المصدر: ${escapeHtml(source)}`,
  ].join('\n');
}
