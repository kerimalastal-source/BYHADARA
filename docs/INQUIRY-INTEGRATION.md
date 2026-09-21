# Receiving service contract

The website POSTs JSON over HTTPS to the configured private receiver, with `Authorization: Bearer <secret>` and `Idempotency-Key: <requestId>`. Reject wrong secrets. The browser never receives the URL secret, Redis credentials or Turnstile secret.

Payload: `schemaVersion: 1`, UUID `requestId`, `kind`, `locale`, name, company, professional email, phone, country, proposal description, sector/opportunity OR industry/website/partnership, `consent: "yes"`, ISO `receivedAt`, `consentVersion`, and optional attachment `{name: "company-proposal.pdf", contentType: "application/pdf", base64, quarantine: true}`. Anti-bot tokens and raw client IPs are excluded.

Receiver requirements:

- Validate schema again, authenticate, deduplicate UUIDs and durably store before acknowledging. Do not return a success code for an unpersisted queue item or failed CRM write.
- Store PDF bytes in private storage under a generated object key, outside a public web root. Never use the submitted filename. Block access pending malware scan; clean files require authenticated access with safe download headers. Delete infected files. File signatures at the website boundary are not a malware scanner.
- Enforce the approved retention/deletion policy for inquiries, attachments, logs and backups. Restrict operator access. Never log proposal bodies or secrets.
- Return HTTP 200/201 JSON `{ "accepted": true, "id": "opaque-reference" }`; ID must match `[A-Za-z0-9_-]{1,100}`. With a file, also return `"attachmentStatus": "quarantined"` only after private quarantine persistence succeeds.
- A retry with the same requestId must return the same receipt without creating another inquiry. Subsequent CRM sync should also be idempotent.
- For transient failure, return a non-2xx response. The site shows an error, retains entered information for retry, and never reports a successful submission without the expected acknowledgment.

The route limits a multipart body to 2 MB + 64 KB while reading the stream. Attachments are PDF-only, at most 2 MB, checked for header and EOF signatures; privacy consent, minimum proposal length, enumerated categories, minimum completion time, honeypot, Turnstile hostname/action, and an atomic Redis 5 attempts / 15 minutes limit are verified. On Vercel, use the platform-overwritten IP header. On another host, configure a trusted proxy/IP policy before production; the current non-Vercel limiter deliberately shares a `local` bucket.

The local tests use mocked services and synthetic records only. They validate boundaries, not real email delivery, CRM persistence or malware scanning. Real service validation is a deployment activation requirement.
