// IndexNow: after a production build, tell Bing, Yandex and the other IndexNow engines which
// pages are new or changed, so they recrawl them within hours. Each build publishes
// /indexnow-manifest.json (URL -> content fingerprint); the next build fetches the live one and
// submits only the URLs whose fingerprint differs. Same design as HADARA Hospitality and
// HADARA Real Estate. Pure helpers live here so they can be tested; scripts/indexnow.ts runs them.
import { createHash } from 'node:crypto';

/** Public by design: the engines read it at /<key>.txt (public/<key>.txt, keep both in sync). */
export const INDEXNOW_KEY = '25b85c16b8f40be94bf4f82fa3dcb1c9';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const MANIFEST_PATH = '/indexnow-manifest.json';
/** IndexNow accepts up to 10,000 URLs per request. */
const BATCH = 10000;

export type Manifest = Record<string, string>;

/**
 * Fingerprint of what a search engine reads: title, description and <main>. Scripts (including
 * the React payload) and hashed /_next/static/ file names are dropped, so a CSS or bundling change
 * alone does not mark every page as changed.
 */
export function contentFingerprint(html: string) {
  const pick = (re: RegExp) => html.match(re)?.[1] ?? '';
  const title = pick(/<title>([\s\S]*?)<\/title>/i);
  const description = pick(/<meta name="description" content="([^"]*)"/i);
  const main = pick(/<main[^>]*>([\s\S]*)<\/main>/i)
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/\/_next\/static\/[^"'\s)]+/g, '');
  return createHash('sha256')
    .update(`${title}\n${description}\n${main}`)
    .digest('hex')
    .slice(0, 16);
}

/** URLs that are new or whose fingerprint changed. Removed URLs redirect or 404 on their own. */
export const changedUrls = (previous: Manifest | null, next: Manifest) =>
  Object.keys(next).filter((url) => !previous || previous[url] !== next[url]);

export const sitemapUrls = (xml: string) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

/** Prerendered HTML of a page under `.next/server/app`: "/en/markets/gcc" → "en/markets/gcc.html". */
export const builtFileFor = (url: string) =>
  `${new URL(url).pathname.replace(/^\/|\/$/g, '')}.html`;

/** Sends the URLs in batches and returns how many were accepted. Never throws. */
export async function submitIndexNow(
  urls: string[],
  origin: string,
  deps: { fetch: typeof fetch; log: (message: string) => void },
) {
  let sent = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    try {
      const response = await deps.fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: new URL(origin).host,
          key: INDEXNOW_KEY,
          keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
          urlList,
        }),
        signal: AbortSignal.timeout(15000),
      });
      // 200 OK and 202 Accepted (key validation pending) both mean received.
      if (response.status === 200 || response.status === 202) sent += urlList.length;
      else
        deps.log(
          `[indexnow] batch refused: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`,
        );
    } catch (error) {
      deps.log(`[indexnow] batch failed: ${error instanceof Error ? error.message : error}`);
    }
  }
  return sent;
}

/** The manifest to publish: unsent URLs are left out, so the next build sends them again. */
export function manifestToPublish(next: Manifest, unsent: string[]): Manifest {
  const skip = new Set(unsent);
  return Object.fromEntries(Object.entries(next).filter(([url]) => !skip.has(url)));
}
