// Runs after `next build` (see the build script). Writes public/indexnow-manifest.json, which
// Vercel deploys with the build, and on Vercel production builds only submits the pages that are
// new or changed since the live manifest to IndexNow. Never fails the build. See lib/indexnow.ts.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  INDEXNOW_KEY,
  MANIFEST_PATH,
  builtFileFor,
  changedUrls,
  contentFingerprint,
  manifestToPublish,
  sitemapUrls,
  submitIndexNow,
  type Manifest,
} from '../lib/indexnow';

const built = resolve('.next/server/app');
const log = (message: string) => console.log(`[indexnow] ${message}`);

async function main() {
  const sitemap = resolve(built, 'sitemap.xml.body');
  if (!existsSync(sitemap)) return log('no built sitemap, skipping');
  const urls = sitemapUrls(readFileSync(sitemap, 'utf8'));
  if (!urls.length) return log('empty sitemap, skipping');
  const origin = new URL(urls[0]).origin;
  const manifest: Manifest = {};
  for (const url of urls) {
    const file = resolve(built, builtFileFor(url));
    if (existsSync(file)) manifest[url] = contentFingerprint(readFileSync(file, 'utf8'));
  }
  const total = Object.keys(manifest).length;
  const publish = (unsent: string[], note: string) => {
    writeFileSync(
      resolve('public', MANIFEST_PATH.slice(1)),
      JSON.stringify(manifestToPublish(manifest, unsent)),
    );
    log(`${note} (manifest: ${total - unsent.length} of ${total} pages)`);
  };

  if (process.env.VERCEL_ENV !== 'production')
    return publish([], 'not a production build, nothing submitted');

  const get = (path: string) =>
    fetch(`${origin}${path}`, { signal: AbortSignal.timeout(10000), cache: 'no-store' });
  // The engines verify the key on the live site; on the very first deploy it is not there yet.
  const keyLive = await get(`/${INDEXNOW_KEY}.txt`)
    .then(async (r) => r.ok && (await r.text()).trim() === INDEXNOW_KEY)
    .catch(() => false);
  if (!keyLive) return publish(urls, 'key file not live yet, every page held for the next build');

  let previous: Manifest | null = null;
  try {
    const response = await get(MANIFEST_PATH);
    if (response.ok) previous = (await response.json()) as Manifest;
    else {
      // The key is live but the manifest is not: compare with the live pages themselves, so
      // unchanged pages are not sent again with every deployment.
      log(`no live manifest (HTTP ${response.status}), comparing with the live pages`);
      previous = {};
      for (const url of urls) {
        const page = await get(new URL(url).pathname).catch(() => null);
        if (page?.ok) previous[url] = contentFingerprint(await page.text());
      }
    }
  } catch (error) {
    // Without the live manifest nothing can be compared: publish an empty one so the next
    // production build sends every page.
    return publish(
      urls,
      `live manifest unreachable (${error instanceof Error ? error.message : error}), retry next build`,
    );
  }

  const changed = changedUrls(previous, manifest);
  if (!changed.length) return publish([], 'no changed pages');
  const sent = await submitIndexNow(changed, origin, { fetch, log: console.log });
  publish(sent ? [] : changed, `submitted ${sent} of ${changed.length} changed pages`);
}

main().catch((error) => log(`skipped: ${error instanceof Error ? error.message : error}`));
