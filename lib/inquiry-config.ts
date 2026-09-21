/** No CRM tokens are ever passed to client components. All gates are required. */
export function inquiriesEnabled() {
  return (
    process.env.INQUIRIES_ENABLED === 'true' &&
    process.env.PRIVACY_REVIEWED === 'true' &&
    Boolean(
      process.env.INQUIRY_WEBHOOK_URL &&
      process.env.INQUIRY_WEBHOOK_SECRET &&
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN &&
      process.env.TURNSTILE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
      process.env.CONTACT_EMAIL &&
      process.env.RATE_LIMIT_SALT &&
      process.env.TURNSTILE_HOSTNAMES,
    )
  );
}
