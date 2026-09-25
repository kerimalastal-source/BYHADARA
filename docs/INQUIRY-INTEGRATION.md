# Contact form delivery

The contact form (`components/ContactForm.tsx`) posts JSON to `/api/inquiries`:

`topic` (`general`, `investment` or `partnership`, from the page it was sent on), `locale`, `name`, `email` (stored in lower case), `company` (optional), `country` (ISO 3166-1 alpha-2 code whose calling code is prefixed to the number), `phone` (national number without the country code), `website` (optional; `company.com` is stored as `https://company.com/`), `message`, `marketing` (`"yes"` only when the optional email-updates box is ticked), `startedAt`, and the hidden honeypot `websiteTrap`.

The route (`app/api/inquiries/route.ts`):

1. Returns 503 while `RESEND_API_KEY` is unset.
2. Accepts only requests whose `Origin` is the site itself or listed in `INQUIRY_ALLOWED_ORIGINS`, with `Content-Type: application/json` and a body of at most 16 KB (read with a bounded stream).
3. Silently drops a request with a filled honeypot (reports success to the bot, sends nothing).
4. Validates every field with the same Zod schema the browser uses (`lib/inquiry-schema.ts`) and rejects forms completed in under 3 seconds or older than 24 hours; field errors are returned as `{ code: "validation", fields: [...] }` with status 422.
5. Applies the shared Upstash rate limit (5 per IP per 15 minutes, HMAC-hashed IPs) when `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` and `RATE_LIMIT_SALT` are set; a limiter failure blocks the request.
6. Emails the request through the Resend API (`lib/inquiry-service.ts`) to `CONTACT_TO_EMAIL` (default `info@byhadara.com`) from `CONTACT_FROM_EMAIL`. The email contains every field, the full international phone number with `tel:` and WhatsApp links, the topic, the site language and whether the visitor agreed to email updates, and its reply-to address is the visitor's email. All values are HTML-escaped.
7. Returns 200 `{ accepted: true }` only after Resend confirms the message with an ID; any provider error returns 502 and the form keeps the visitor's input so they can retry. The browser then opens `/{locale}/contact/thank-you`.
8. When `HUBSPOT_ACCESS_TOKEN` is set, saves the request in HubSpot after the response has been sent (`lib/hubspot.ts`, via Next.js `after`), so HubSpot can never delay or fail a request.

## HubSpot

Each accepted request creates or updates a HubSpot contact, matched by email, and attaches the request as a note:

- Standard properties: `email`, `firstname` (first word of the name), `lastname` (the rest), `phone` (international, e.g. `+905319309214`), `company` and `website` when given. New contacts get lifecycle stage `lead`.
- Custom properties in the group "BYHADARA website", created automatically on first use: `byhadara_request_types` (multiple checkboxes: general, investment, partnership; each new request type is added), `byhadara_language` (en/ar/tr), `byhadara_email_consent` (single checkbox, set to Yes only when the visitor ticks the box, never set back to No from the website) and `byhadara_email_consent_date`.
- The note holds the request text, company, website, phone, site language and the email-updates choice.

Setup: in HubSpot create a private app (Settings → Integrations → Private Apps; in newer accounts under Development → Legacy apps), give it the scopes `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.schemas.contacts.read` and `crm.schemas.contacts.write`, copy its access token into the Vercel variable `HUBSPOT_ACCESS_TOKEN` (Production) and redeploy.

If the schema scopes are missing, the contact and note are still saved with the standard properties only. If a HubSpot value is rejected, the contact is saved with the basic details. Any failure is logged in the Vercel function logs as `HubSpot sync failed. <step>: HubSpot responded <status> <category>`, without personal data; the email to the inbox is unaffected.

For email campaigns, build a HubSpot list with "Agreed to email updates is Yes" (and, if needed, "Website language"). Only those contacts may receive marketing emails; in Türkiye, commercial electronic messages also require consent records in İYS.

Tests in `tests/inquiries.test.ts` use mocked Resend and HubSpot APIs and synthetic data only. Real delivery is verified after deployment by sending a test request.
