import { paths } from '@/content/site';
import { isLocale, type Locale } from '@/content/locales';
import { publishedArticles } from '@/content/articles';
import { databaseUrl, db } from './db';
import { escapeHtml } from './html';
import { editTelegramMessage, sendTelegramMessage } from './telegram';
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
/** The tables and indexes; created automatically the first time a visit is saved. */
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
  // The Telegram message of each session, so later pages update it instead of sending new ones.
  `CREATE TABLE IF NOT EXISTS visitor_alerts (
  session_id text PRIMARY KEY NOT NULL,
  message_id bigint NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
)`,
];
/** Earlier views read back for the trail, and the most pages the alert lists. */
const TRAIL_ROWS = 60;
const TRAIL_PAGES = 30;
/** What the session looked like when a page view was saved. */
export type VisitState = {
  /** No earlier event in this session. */
  first: boolean;
  /** Pages viewed so far, this one included. */
  pages: number;
  /** Seconds since the session's first page. */
  seconds: number;
  /** This path was not viewed earlier in the session. */
  newPage: boolean;
  /** The session's first page view (this one for a new session). */
  landing: Visit;
  /**
   * The pages of the visit in order, this one last, each with the seconds spent on it (null for
   * this one). Long visits keep the latest pages only; `hiddenPages` counts the ones left out.
   */
  trail: { path: string; seconds: number | null }[];
  hiddenPages: number;
  /** The Telegram alert for this session, once it has been sent. */
  messageId: number | null;
  /** Other sessions that opened the same landing page within 10 seconds of this one's start. */
  burst: number;
};
/**
 * Saves the visit and reads the session it belongs to, in one statement whose snapshot cannot
 * see the row it inserts.
 */
export async function recordVisit(visit: Visit): Promise<VisitState> {
  const sql = db();
  const id = visit.sessionId;
  const save = () => sql`
    WITH prior AS (
      SELECT count(*)::int AS pages, min(created_at) AS started,
        coalesce(bool_or(path = ${visit.path}), false) AS seen
      FROM visitor_events WHERE session_id = ${id}
    ),
    landing AS (
      SELECT path, locale, referrer, country, city FROM visitor_events
      WHERE session_id = ${id} ORDER BY created_at LIMIT 1
    ),
    recent AS (
      SELECT coalesce(json_agg(json_build_object('path', path, 'at', at) ORDER BY at), '[]') AS views
      FROM (
        SELECT path, extract(epoch FROM created_at)::float8 AS at FROM visitor_events
        WHERE session_id = ${id} ORDER BY created_at DESC LIMIT ${TRAIL_ROWS}
      ) latest
    ),
    alert AS (SELECT message_id::text AS message_id FROM visitor_alerts WHERE session_id = ${id}),
    burst AS (
      SELECT count(DISTINCT session_id)::int AS others FROM visitor_events
      WHERE session_id <> ${id}
        AND path = coalesce((SELECT path FROM landing), ${visit.path})
        AND created_at BETWEEN coalesce((SELECT started FROM prior), now()) - interval '10 seconds'
          AND coalesce((SELECT started FROM prior), now()) + interval '10 seconds'
    ),
    saved AS (
      INSERT INTO visitor_events (session_id, path, locale, referrer, country, city)
      VALUES (${id}, ${visit.path}, ${visit.locale}, ${visit.referrer}, ${visit.country},
        ${visit.city})
      RETURNING created_at
    )
    SELECT prior.pages, prior.seen,
      coalesce(extract(epoch FROM saved.created_at - prior.started), 0)::int AS seconds,
      extract(epoch FROM saved.created_at)::float8 AS at, recent.views,
      landing.path, landing.locale, landing.referrer, landing.country, landing.city,
      alert.message_id, burst.others AS burst
    FROM saved CROSS JOIN prior CROSS JOIN recent CROSS JOIN burst LEFT JOIN landing ON true
      LEFT JOIN alert ON true`;
  let rows: Record<string, unknown>[];
  try {
    rows = await save();
  } catch (error) {
    // 42P01: a table does not exist yet (a new database, or one from before visitor_alerts).
    if ((error as { code?: string }).code !== '42P01') throw error;
    await sql
      .transaction(visitorEventsSchema.map((statement) => sql.query(statement)))
      .catch(() => {
        // Another request may have created them at the same moment; saving again tells.
      });
    rows = await save();
  }
  const row = rows[0] ?? {};
  const text = (value: unknown) => (typeof value === 'string' ? value : null);
  const earlier = Number(row.pages) || 0;
  const landingLocale = text(row.locale);
  // Earlier views (oldest first, at most TRAIL_ROWS), then this one.
  const views = [
    ...(Array.isArray(row.views) ? row.views : [])
      .filter((v) => typeof v?.path === 'string' && Number.isFinite(Number(v?.at)))
      .map((v) => ({ path: String(v.path), at: Number(v.at) })),
    { path: visit.path, at: Number(row.at) || 0 },
  ];
  const shown = trailOf(views);
  return {
    first: earlier === 0,
    pages: earlier + 1,
    seconds: Number(row.seconds) || 0,
    newPage: row.seen !== true,
    landing:
      earlier === 0 || !text(row.path)
        ? visit
        : {
            ...visit,
            path: text(row.path)!,
            locale: landingLocale && isLocale(landingLocale) ? landingLocale : visit.locale,
            referrer: text(row.referrer),
            country: text(row.country),
            city: text(row.city),
          },
    trail: shown,
    hiddenPages: earlier + 1 - shown.length,
    messageId: Number(row.message_id) || null,
    burst: Number(row.burst) || 0,
  };
}
/** Views (oldest first) as trail pages with the seconds spent on each, the latest ones only. */
function trailOf(views: { path: string; at: number }[]) {
  return views
    .map((view, i) => ({
      path: view.path,
      seconds: i < views.length - 1 ? Math.max(0, views[i + 1].at - view.at) : null,
    }))
    .slice(-TRAIL_PAGES);
}
/**
 * The session as it stands now, read back when a new visitor's alert is sent after its wait, so
 * pages viewed meanwhile are in it: the page count, visit length, trail and current page.
 */
export async function sessionTrail(sessionId: string) {
  const rows = await db()`
    SELECT path, extract(epoch FROM created_at)::float8 AS at, count(*) OVER ()::int AS total,
      extract(epoch FROM min(created_at) OVER ())::float8 AS started
    FROM visitor_events WHERE session_id = ${sessionId}
    ORDER BY created_at DESC LIMIT ${TRAIL_ROWS}`;
  const views = rows
    .map((r) => ({ path: String(r.path), at: Number(r.at) }))
    .filter((v) => v.path && Number.isFinite(v.at))
    .reverse();
  if (!views.length) return null;
  const pages = Number(rows[0].total) || views.length;
  const trail = trailOf(views);
  return {
    current: views[views.length - 1].path,
    pages,
    seconds: Math.max(0, Math.round(views[views.length - 1].at - Number(rows[0].started))),
    trail,
    hiddenPages: pages - trail.length,
  };
}
/** Remembers the Telegram alert of a session. */
async function saveAlert(sessionId: string, messageId: number) {
  await db()`
    INSERT INTO visitor_alerts (session_id, message_id) VALUES (${sessionId}, ${messageId})
    ON CONFLICT (session_id) DO NOTHING`;
}
/** Deletes events and alert references older than 30 days. */
export async function removeOldVisits() {
  const sql = db();
  await sql.transaction([
    sql`DELETE FROM visitor_events WHERE created_at < now() - interval '30 days'`,
    sql`DELETE FROM visitor_alerts WHERE created_at < now() - interval '30 days'`,
  ]);
}
const languages: Record<Locale, string> = { en: 'الإنجليزية', ar: 'العربية', tr: 'التركية' };
/** Request pages whose first opening in a visit sends a separate alert. */
const requestPages: Record<string, string> = {
  contact: 'التواصل',
  'inquiries/investment': 'الاستثمار',
  'inquiries/partnership': 'الشراكة',
};
/** A path shown left to right inside Arabic text, so "/tr" never reads "tr/". */
const shownPath = (path: string) => `‎${escapeHtml(path)}`;
function place(visit: Visit) {
  let country = visit.country;
  if (country) {
    try {
      country = new Intl.DisplayNames(['ar'], { type: 'region' }).of(country) ?? country;
    } catch {
      // Unknown code: keep it as it is.
    }
  }
  return escapeHtml([visit.city, country].filter(Boolean).join('، ') || 'غير معروف');
}
const source = (visit: Visit) =>
  escapeHtml(visit.referrer ? new URL(visit.referrer).host.replace(/^www\./, '') : 'مباشر');
/** Visit length in Arabic, in whole minutes. */
export function visitLength(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 1) return 'أقل من دقيقة';
  if (minutes === 1) return 'دقيقة';
  if (minutes === 2) return 'دقيقتان';
  if (minutes <= 10) return `${minutes} دقائق`;
  if (minutes < 60) return `${minutes} دقيقة`;
  return 'أكثر من ساعة';
}
/** The Telegram alert for a new visitor, in Arabic (parse_mode HTML, every value escaped). */
export function newVisitorMessage(visit: Visit) {
  return [
    '🌐 BYHADARA — زائر جديد',
    `📍 من: ${place(visit)}`,
    `📄 الصفحة: ${shownPath(visit.path)}`,
    `🗣 اللغة: ${languages[visit.locale]}`,
    `↩️ المصدر: ${source(visit)}`,
  ].join('\n');
}
/** "And N pages" in Arabic, for the pages a long visit's alert leaves out. */
const earlierPages = (n: number) =>
  n === 1 ? 'وصفحة واحدة' : n === 2 ? 'وصفحتان' : n <= 10 ? `و${n} صفحات` : `و${n} صفحة`;
/** Time spent on one page, short: seconds under a minute, then minutes. */
export function pageTime(seconds: number) {
  if (seconds < 60) return `${Math.max(1, Math.floor(seconds))} ث`;
  const minutes = Math.floor(seconds / 60);
  return minutes < 60 ? `${minutes} د` : 'أكثر من ساعة';
}
/**
 * The same alert once the visitor has moved on: every page of the visit in order with the time
 * spent on it, and the last page, which is where the visit ended once updates stop.
 */
export function visitUpdateMessage(visit: Visit, state: VisitState) {
  const { landing, trail, hiddenPages } = state;
  const pages = trail.map(
    (page, i) =>
      `${hiddenPages + i + 1}. ${shownPath(page.path)}${
        page.seconds === null ? '' : ` · ${pageTime(page.seconds)}`
      }`,
  );
  return [
    '🌐 BYHADARA — زائر جديد',
    `📍 من: ${place(landing)}`,
    `🗣 اللغة: ${languages[landing.locale]}`,
    `↩️ المصدر: ${source(landing)}`,
    `🔢 عدد الصفحات: ${state.pages} · مدة الزيارة: ${visitLength(state.seconds)}`,
    '🧭 مسار الزيارة:',
    ...(hiddenPages > 0 ? [`… ${earlierPages(hiddenPages)} قبلها`] : []),
    ...pages,
    `👣 آخر صفحة: ${shownPath(visit.path)}`,
  ].join('\n');
}
/** The separate alert when a visitor first opens a request page in this visit, or null. */
export function requestPageMessage(visit: Visit, state: VisitState) {
  const page = requestPages[visit.path.split('/').slice(2).join('/')];
  if (!page || !state.newPage) return null;
  return [`🔥 الزائر فتح صفحة ${page}`, `📍 ${place(visit)} · 📄 ${shownPath(visit.path)}`].join(
    '\n',
  );
}
/**
 * Small towns whose visits are mostly data centers (Meta, Amazon, Google, Microsoft), as
 * "city|country" in lower case without accents. Link previews and safety checks, Meta's
 * especially, open a shared page in a normal-looking browser from these places, so the user
 * agent does not give them away. Real cities that also have a data center (Fort Worth, Henrico,
 * Council Bluffs, Sterling) are left out so a real visitor there is never hidden: a burst catches
 * those checks instead. Same list as HADARA Hospitality (its PR #137, owner's request 2026-09-29).
 */
const DATA_CENTER_TOWNS = new Set([
  'clonee|ie',
  'odense|dk',
  'lulea|se',
  'prineville|us',
  'forest city|us',
  'altoona|us',
  'los lunas|us',
  'papillion|us',
  'new albany|us',
  'sandston|us',
  'eagle mountain|us',
  'ashburn|us',
  'boardman|us',
  'umatilla|us',
  'the dalles|us',
  'moncks corner|us',
  'lenoir|us',
  'pryor|us',
  'boydton|us',
  'saint-ghislain|be',
  'st. ghislain|be',
  'hamina|fi',
  'eemshaven|nl',
]);
const plainCity = (city: string) =>
  city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
/**
 * Why a visit looks automated, or null: its landing city is a data-center town, or other
 * sessions opened the same landing page at the same moment.
 */
export function botReason(visit: Visit, burst: number) {
  const town =
    visit.city && visit.country ? `${plainCity(visit.city)}|${visit.country.toLowerCase()}` : '';
  if (DATA_CENTER_TOWNS.has(town)) return 'data-center town';
  return burst > 0 ? 'same-page burst' : null;
}
/** Other sessions that opened `path` within 10 seconds of this session's first page. */
export async function burstFor(sessionId: string, path: string) {
  const rows = await db()`
    WITH started AS (SELECT min(created_at) AS at FROM visitor_events WHERE session_id = ${sessionId})
    SELECT count(DISTINCT session_id)::int AS others FROM visitor_events, started
    WHERE session_id <> ${sessionId} AND path = ${path}
      AND created_at BETWEEN coalesce(started.at, now()) - interval '10 seconds'
        AND coalesce(started.at, now()) + interval '10 seconds'`;
  return Number(rows[0]?.others) || 0;
}
/**
 * How long a new session's alert waits before deciding, so the rest of a burst has arrived and
 * is counted (tests shorten it). The visit function's `maxDuration` must cover this wait plus
 * the Telegram calls.
 */
export const alertSettle = { ms: 8000 };
/**
 * Tells the team on Telegram, after the response: a new session sends the alert (and remembers
 * it), a later page silently updates that alert, and the first opening of a request page sends
 * a separate message as a reply to it. A visit that looks automated (`botReason`) gets no message
 * at all, only its saved events (owner's request, 2026-09-29). A new session first waits
 * `alertSettle.ms`, so the first visit of a burst is recognised too; once a session has its
 * alert, it was judged a person and keeps its updates even if a burst comes later.
 */
export async function notifyTeam(visit: Visit, state: VisitState) {
  let messageId = state.messageId;
  let burst = messageId ? 0 : state.burst;
  if (state.first) {
    await new Promise((resolve) => setTimeout(resolve, alertSettle.ms));
    burst = await burstFor(visit.sessionId, visit.path);
  }
  const reason = botReason(state.landing, burst);
  if (reason) {
    console.info(`Visitor alert skipped, likely automated: ${reason}.`);
    return;
  }
  if (state.first) {
    // Pages viewed during the wait belong in the alert, since there was no alert to update yet.
    const now = await sessionTrail(visit.sessionId);
    const text =
      now && now.pages > 1
        ? visitUpdateMessage({ ...visit, path: now.current }, { ...state, ...now })
        : newVisitorMessage(visit);
    messageId = (await sendTelegramMessage(text)) ?? null;
    if (messageId) await saveAlert(visit.sessionId, messageId);
    console.info('Visitor alert sent.');
  } else if (messageId) {
    // An alert the team deleted cannot be edited; that must not stop the request-page alert.
    await editTelegramMessage(messageId, visitUpdateMessage(visit, state)).catch((error) =>
      console.error(`Visitor alert update failed. ${error instanceof Error ? error.message : ''}`),
    );
  }
  const request = requestPageMessage(visit, state);
  if (request) {
    await sendTelegramMessage(request, messageId);
    console.info('Visitor request-page alert sent.');
  }
}
