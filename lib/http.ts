import { after } from 'next/server';
/** Same-origin requests only, plus any extra origins listed in INQUIRY_ALLOWED_ORIGINS. */
export function allowedOrigin(request: Request) {
  const host = (value: string | null) => {
    try {
      return value ? new URL(value).host : '';
    } catch {
      return '';
    }
  };
  const origin = host(request.headers.get('origin'));
  // The host the visitor actually requested (Vercel and proxies set these headers).
  const own = [
    request.headers.get('x-forwarded-host'),
    request.headers.get('host'),
    host(request.url),
  ];
  const extra = (process.env.INQUIRY_ALLOWED_ORIGINS || '').split(',').map((x) => host(x.trim()));
  return Boolean(origin) && (own.includes(origin) || extra.includes(origin));
}
/**
 * Runs work after the response, so a slow or failing service never delays or blocks a request.
 * `failure` starts the log line written when the work fails.
 */
export function afterResponse(task: () => Promise<unknown>, failure: string) {
  const run = () =>
    task().catch((error) =>
      console.error(`${failure} ${error instanceof Error ? error.message : ''}`),
    );
  try {
    after(run);
  } catch {
    // Outside a Next.js request (unit tests call the handlers directly).
    void run();
  }
}
/** Reads at most `limit` bytes of the body, or returns null when it is larger. */
export async function readBody(request: Request, limit: number) {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    size += part.value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(part.value);
  }
  return Buffer.concat(chunks).toString('utf8');
}
