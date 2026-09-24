# Contact form delivery

The contact form (`components/ContactForm.tsx`) posts JSON to `/api/inquiries`:

`topic` (`general`, `investment` or `partnership`, from the page it was sent on), `locale`, `name`, `company` (optional), `country` (ISO 3166-1 alpha-2 code whose calling code is prefixed to the number), `phone` (national number without the country code), `website` (optional; `company.com` is stored as `https://company.com/`), `message`, `startedAt`, and the hidden honeypot `websiteTrap`.

The route (`app/api/inquiries/route.ts`):

1. Returns 503 while `RESEND_API_KEY` is unset.
2. Accepts only requests whose `Origin` is the site itself or listed in `INQUIRY_ALLOWED_ORIGINS`, with `Content-Type: application/json` and a body of at most 16 KB (read with a bounded stream).
3. Silently drops a request with a filled honeypot (reports success to the bot, sends nothing).
4. Validates every field with the same Zod schema the browser uses (`lib/inquiry-schema.ts`) and rejects forms completed in under 3 seconds or older than 24 hours; field errors are returned as `{ code: "validation", fields: [...] }` with status 422.
5. Applies the shared Upstash rate limit (5 per IP per 15 minutes, HMAC-hashed IPs) when `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` and `RATE_LIMIT_SALT` are set; a limiter failure blocks the request.
6. Emails the request through the Resend API (`lib/inquiry-service.ts`) to `CONTACT_TO_EMAIL` (default `info@byhadara.com`) from `CONTACT_FROM_EMAIL`. The email contains every field, the full international phone number with `tel:` and WhatsApp links, the topic and the site language. All values are HTML-escaped.
7. Returns 200 `{ accepted: true }` only after Resend confirms the message with an ID; any provider error returns 502 and the form keeps the visitor's input so they can retry.

Tests in `tests/inquiries.test.ts` use a mocked provider and synthetic data only. Real delivery is verified after deployment by sending a test request.
