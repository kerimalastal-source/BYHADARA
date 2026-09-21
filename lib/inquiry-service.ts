import { createHmac } from 'node:crypto';
import type { Inquiry } from './inquiry-schema';
export function safeEndpoint(value: string) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password)
    throw new Error('HTTPS configuration required');
  return url.toString();
}
/** Shared, atomic limiter. IPs are HMACed; no raw IP is persisted. Fail closed. */
export async function rateLimit(ip: string) {
  const digest = createHmac('sha256', process.env.RATE_LIMIT_SALT!).update(ip).digest('hex');
  const response = await fetch(safeEndpoint(process.env.UPSTASH_REDIS_REST_URL!), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      'EVAL',
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n",
      '1',
      `byhadara:inquiry:${digest}`,
    ]),
    signal: AbortSignal.timeout(5000),
    cache: 'no-store',
    redirect: 'error',
  });
  if (!response.ok) throw new Error('Limiter unavailable');
  const result = await response.json();
  if (typeof result.result !== 'number') throw new Error('Invalid limiter response');
  return result.result <= 5;
}
export async function verifyChallenge(token: string) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return false;
  const result = await response.json();
  const hosts = (process.env.TURNSTILE_HOSTNAMES || '').split(',').map((x) => x.trim());
  return result.success === true && result.action === 'inquiry' && hosts.includes(result.hostname);
}
export type Attachment = {
  name: string;
  contentType: 'application/pdf';
  base64: string;
  quarantine: true;
};
/** Receiver must deduplicate by requestId, durably store the inquiry and quarantine PDF before returning accepted:true. */
export async function deliverInquiry(inquiry: Inquiry, attachment?: Attachment) {
  const { token: _, websiteTrap: __, startedAt: ___, ...data } = inquiry;
  const response = await fetch(safeEndpoint(process.env.INQUIRY_WEBHOOK_URL!), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': inquiry.requestId,
    },
    body: JSON.stringify({
      schemaVersion: 1,
      ...data,
      receivedAt: new Date().toISOString(),
      consentVersion: '2026-09-22',
      attachment,
    }),
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error('Receiver unavailable');
  const result = await response.json();
  if (
    result.accepted !== true ||
    typeof result.id !== 'string' ||
    !/^[A-Za-z0-9_-]{1,100}$/.test(result.id) ||
    (attachment && result.attachmentStatus !== 'quarantined')
  )
    throw new Error('Receiver did not acknowledge durable acceptance');
  return result.id as string;
}
