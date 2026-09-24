import { site } from '@/content/site';
/** Requests are delivered by email through Resend; without an API key the forms stay disabled. */
export const inquiriesEnabled = () => Boolean(process.env.RESEND_API_KEY);
/** Inbox that receives every request (info@byhadara.com unless overridden). */
export const inquiryRecipient = () => process.env.CONTACT_TO_EMAIL || site.email;
/** Sender address; must belong to a domain verified in Resend for delivery to info@byhadara.com. */
export const inquirySender = () =>
  process.env.CONTACT_FROM_EMAIL || 'BYHADARA Website <onboarding@resend.dev>';
/** The shared rate limiter runs only when Upstash Redis and a salt are configured. */
export const rateLimitConfigured = () =>
  Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN &&
    process.env.RATE_LIMIT_SALT,
  );
