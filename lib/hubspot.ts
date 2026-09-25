import type { Inquiry } from './inquiry-schema';
import { escapeHtml, internationalNumber, topicLabels } from './inquiry-service';
/** Every accepted request is also saved in HubSpot when an access token is configured. */
export const hubspotConfigured = () => Boolean(process.env.HUBSPOT_ACCESS_TOKEN);
const API = 'https://api.hubapi.com';
const group = 'byhadara_website';
const options = (values: Record<string, string>) =>
  Object.entries(values).map(([value, label], displayOrder) => ({ label, value, displayOrder }));
/** Contact properties the website fills in, created in HubSpot on first use. */
export const customProperties = [
  {
    name: 'byhadara_request_types',
    label: 'Website request types',
    type: 'enumeration',
    fieldType: 'checkbox',
    options: options(topicLabels),
  },
  {
    name: 'byhadara_language',
    label: 'Website language',
    type: 'enumeration',
    fieldType: 'select',
    options: options({ en: 'English', ar: 'Arabic', tr: 'Turkish' }),
  },
  {
    name: 'byhadara_email_consent',
    label: 'Agreed to email updates',
    type: 'enumeration',
    fieldType: 'booleancheckbox',
    options: options({ true: 'Yes', false: 'No' }),
  },
  {
    name: 'byhadara_email_consent_date',
    label: 'Email updates consent date',
    type: 'datetime',
    fieldType: 'date',
  },
];
class HubSpotError extends Error {
  constructor(step: string, status: number, category?: unknown) {
    // Status and HubSpot's error category only: messages can echo the visitor's details.
    super(
      `${step}: HubSpot responded ${status}${typeof category === 'string' ? ` ${category}` : ''}`,
    );
  }
}
async function call(path: string, method = 'GET', body?: unknown) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(8000),
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}
/** Creates the property group and properties; ones that already exist are kept as they are. */
async function createSchema() {
  const created = (status: number) => status === 201 || status === 409;
  const g = await call('/crm/v3/properties/contacts/groups', 'POST', {
    name: group,
    label: 'BYHADARA website',
  });
  if (!created(g.status))
    throw new HubSpotError('Create property group', g.status, g.data.category);
  for (const property of customProperties) {
    const p = await call('/crm/v3/properties/contacts', 'POST', {
      ...property,
      groupName: group,
      description: 'Filled in by the contact forms on byhadara.com.',
    });
    if (!created(p.status))
      throw new HubSpotError(`Create property ${property.name}`, p.status, p.data.category);
  }
  return true;
}
let schema: Promise<boolean> | undefined;
/**
 * Checks the schema once per server instance, and again on the next request after a failure.
 * Without it, contacts are still saved with the standard properties.
 */
function ensureSchema() {
  schema ??= createSchema().catch((error) => {
    console.warn(
      `HubSpot custom properties unavailable. ${error instanceof Error ? error.message : ''}`,
    );
    schema = undefined;
    return false;
  });
  return schema;
}
/** Test hook: forget which properties were created. */
export const resetHubspotSchema = () => (schema = undefined);
function noteBody(inquiry: Inquiry, phone: string) {
  const details: [string, string][] = [
    ['Company', inquiry.company || '—'],
    ['Company website', inquiry.website || '—'],
    ['Phone', phone],
    ['Site language', inquiry.locale.toUpperCase()],
    ['Email updates', inquiry.marketing ? 'Agreed to receive them' : 'Not requested'],
  ];
  return `<p><strong>Website request: ${topicLabels[inquiry.topic]}</strong></p><p>${escapeHtml(
    inquiry.message,
  ).replace(/\n/g, '<br>')}</p><p>${details
    .map(([label, value]) => `${label}: ${escapeHtml(value)}`)
    .join('<br>')}</p>`;
}
/**
 * Creates or updates the visitor's contact (matched by email) and attaches the request as a
 * note. Consent to email updates is only ever recorded as given, never withdrawn, from here.
 */
export async function saveToHubspot(inquiry: Inquiry) {
  const custom = await ensureSchema();
  const byEmail = `/crm/v3/objects/contacts/${encodeURIComponent(inquiry.email)}?idProperty=email`;
  const found = await call(`${byEmail}&properties=byhadara_request_types`);
  if (found.status !== 200 && found.status !== 404)
    throw new HubSpotError('Find contact', found.status, found.data.category);
  const [firstname, ...rest] = inquiry.name.split(/\s+/);
  const phone = `+${internationalNumber(inquiry)}`;
  const standard: Record<string, string> = {
    email: inquiry.email,
    firstname,
    phone,
    ...(rest.length ? { lastname: rest.join(' ') } : {}),
    ...(inquiry.company ? { company: inquiry.company } : {}),
    ...(inquiry.website ? { website: inquiry.website } : {}),
  };
  const previous = String(found.data.properties?.byhadara_request_types || '');
  const extra: Record<string, string> = custom
    ? {
        byhadara_request_types: [
          ...new Set([...previous.split(';').filter(Boolean), inquiry.topic]),
        ].join(';'),
        byhadara_language: inquiry.locale,
        ...(inquiry.marketing
          ? {
              byhadara_email_consent: 'true',
              byhadara_email_consent_date: new Date().toISOString(),
            }
          : {}),
      }
    : {};
  /** Writes the contact; if HubSpot rejects an optional value, keeps the basic details. */
  const save = async (step: string, method: string, path: string, properties: object) => {
    let r = await call(path, method, { properties });
    if (r.status === 400 && properties !== standard)
      r = await call(path, method, { properties: standard });
    if (r.status !== 200 && r.status !== 201)
      throw new HubSpotError(step, r.status, r.data.category);
    return String(r.data.id);
  };
  const contacts = '/crm/v3/objects/contacts';
  let id: string;
  if (found.status === 200)
    id = await save('Update contact', 'PATCH', byEmail, { ...standard, ...extra });
  else {
    // A new contact starts as a lead.
    const created = await call(contacts, 'POST', {
      properties: { ...standard, ...extra, lifecyclestage: 'lead' },
    });
    if (created.status === 201) id = String(created.data.id);
    // Another request created the contact in the meantime.
    else if (created.status === 409)
      id = await save('Update contact', 'PATCH', byEmail, { ...standard, ...extra });
    else if (created.status === 400) id = await save('Create contact', 'POST', contacts, standard);
    else throw new HubSpotError('Create contact', created.status, created.data.category);
  }
  const note = await call('/crm/v3/objects/notes', 'POST', {
    properties: { hs_timestamp: new Date().toISOString(), hs_note_body: noteBody(inquiry, phone) },
    associations: [
      { to: { id }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] },
    ],
  });
  if (note.status !== 201) throw new HubSpotError('Add note', note.status, note.data.category);
  return id;
}
