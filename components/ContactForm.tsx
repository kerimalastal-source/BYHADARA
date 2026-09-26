'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/content/locales';
import type { FormText } from '@/content/forms';
import type { CountryOption } from '@/content/countries';
import type { Topic } from '@/lib/inquiry-schema';
import { invalidFields } from '@/lib/inquiry-rules';
/** The form's copy in the visitor's language, plus the direct contact details. */
export type ContactFormText = FormText & {
  unavailable: string;
  privacy: string;
  contactEmail: string;
};
/**
 * The site's one contact form, used on the contact page and both inquiry pages. A request the
 * provider accepted leads to the thank-you page. It receives only the visitor's language and
 * checks fields without a validation library, to keep the page light on phones; the server
 * applies the same rules (`lib/inquiry-rules.ts`) and has the final word.
 */
export function ContactForm({
  locale,
  topic,
  enabled,
  countries,
  popular,
  text: t,
}: {
  locale: Locale;
  topic: Topic;
  enabled: boolean;
  countries: CountryOption[];
  /** Shown first in the country-code list. */
  popular: CountryOption[];
  text: ContactFormText;
}) {
  const router = useRouter(),
    thanks = `/${locale}/contact/thank-you`,
    form = useRef<HTMLFormElement>(null),
    status = useRef<HTMLDivElement>(null),
    started = useRef(0),
    pendingFocus = useRef<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({}),
    [state, setState] = useState<'idle' | 'loading' | 'error'>('idle'),
    [message, setMessage] = useState('');
  useEffect(() => {
    started.current = Date.now();
    if (enabled) router.prefetch(thanks);
  }, [enabled, router, thanks]);
  const errorText = (field: string) =>
    field === 'phone' || field === 'country'
      ? t.phoneError
      : field === 'email'
        ? t.emailError
        : field === 'website'
          ? t.websiteError
          : field === 'message'
            ? t.messageError
            : t.required;
  function showErrors(fields: string[]) {
    // One message covers the country code and the number, shown under the phone row.
    const next = Object.fromEntries(
      fields.map((f) => [f === 'country' ? 'phone' : f, errorText(f)]),
    );
    setErrors(next);
    setState('error');
    setMessage(t.invalid);
    pendingFocus.current = fields[0];
  }
  // Move focus once the fields are enabled again, which after a server reply is a later render.
  useEffect(() => {
    if (state !== 'error' || !pendingFocus.current) return;
    form.current?.querySelector<HTMLElement>(`[name="${pendingFocus.current}"]`)?.focus();
    pendingFocus.current = null;
  }, [state, errors]);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!enabled || state === 'loading') return;
    const values = {
      ...Object.fromEntries(new FormData(form.current!)),
      topic,
      locale,
      startedAt: started.current,
    };
    const invalid = invalidFields(values);
    if (invalid.length) return showErrors(invalid);
    setErrors({});
    setState('loading');
    setMessage('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      // The form stays in its sending state until the thank-you page replaces it.
      if (res.ok && data.accepted === true) return router.push(thanks);
      if (res.status === 422 && Array.isArray(data.fields)) return showErrors(data.fields);
      fail(res.status === 429 ? t.rate : `${t.error} ${t.contactEmail}`);
    } catch {
      fail(`${t.error} ${t.contactEmail}`);
    }
  }
  function fail(text: string) {
    setState('error');
    setMessage(text);
    setTimeout(() => status.current?.focus(), 0);
  }
  const described = (name: string, hint?: boolean) =>
    [hint && `${name}-hint`, errors[name] && `${name}-error`].filter(Boolean).join(' ') ||
    undefined;
  const error = (name: string) =>
    errors[name] && (
      <span id={`${name}-error`} className="field-error">
        {errors[name]}
      </span>
    );
  const optional = <span className="optional"> ({t.optional})</span>;
  const option = (c: CountryOption) => (
    <option key={c.iso2} value={c.iso2}>
      {`${c.dial} ${c.name}`}
    </option>
  );
  return (
    <form ref={form} onSubmit={submit} noValidate aria-label={t.submit}>
      <p className="form-required">{t.requiredNote}</p>
      {!enabled && <div className="notice form-unavailable">{t.unavailable}</div>}
      <fieldset disabled={!enabled || state === 'loading'} className="form-fieldset">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">{t.name}</label>
            <input
              id="name"
              name="name"
              required
              maxLength={120}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={described('name')}
            />
            {error('name')}
          </div>
          <div className="field">
            <label htmlFor="email">{t.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              required
              maxLength={254}
              autoComplete="email"
              dir="ltr"
              aria-invalid={!!errors.email}
              aria-describedby={described('email')}
            />
            {error('email')}
          </div>
          <div className="field wide" role="group" aria-labelledby="phone-label">
            <label id="phone-label" htmlFor="phone">
              {t.phone}
            </label>
            <div className="phone-row">
              <label htmlFor="country" className="sr-only">
                {t.countryCode}
              </label>
              <select
                id="country"
                name="country"
                required
                defaultValue=""
                autoComplete="tel-country-code"
                aria-invalid={!!errors.phone}
                aria-describedby={described('phone')}
              >
                <option value="" disabled>
                  {t.countryCode}
                </option>
                <optgroup label={t.popular}>{popular.map(option)}</optgroup>
                <optgroup label={t.allCountries}>{countries.map(option)}</optgroup>
              </select>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                maxLength={24}
                autoComplete="tel-national"
                dir="ltr"
                aria-invalid={!!errors.phone}
                aria-describedby={described('phone')}
              />
            </div>
            {error('phone')}
          </div>
          <div className="field">
            <label htmlFor="company">
              {t.company}
              {optional}
            </label>
            <input
              id="company"
              name="company"
              maxLength={180}
              autoComplete="organization"
              aria-invalid={!!errors.company}
              aria-describedby={described('company')}
            />
            {error('company')}
          </div>
          <div className="field">
            <label htmlFor="website">
              {t.website}
              {optional}
            </label>
            <input
              id="website"
              name="website"
              inputMode="url"
              maxLength={300}
              autoComplete="url"
              placeholder="www.company.com"
              dir="ltr"
              aria-invalid={!!errors.website}
              aria-describedby={described('website', true)}
            />
            <small id="website-hint">{t.websiteHint}</small>
            {error('website')}
          </div>
          <div className="field wide">
            <label htmlFor="message">{t.message}</label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={3000}
              aria-invalid={!!errors.message}
              aria-describedby={described('message')}
            />
            {error('message')}
          </div>
          <div className="field wide consent">
            <input id="marketing" name="marketing" type="checkbox" value="yes" />
            <label htmlFor="marketing">
              {t.marketing}
              {optional}
            </label>
          </div>
        </div>
        <div className="hp" aria-hidden="true">
          <label htmlFor="websiteTrap">Website</label>
          <input id="websiteTrap" name="websiteTrap" tabIndex={-1} autoComplete="off" />
        </div>
        <button className="button form-submit" type="submit">
          {state === 'loading' ? t.submitting : t.submit}
          <span aria-hidden="true" className="arrow">
            ↗
          </span>
        </button>
        <p className="form-note">
          {t.privacyNote} <Link href={`/${locale}/privacy`}>{t.privacy}</Link>.
        </p>
      </fieldset>
      <div className="form-status" role="status" ref={status} tabIndex={-1}>
        {message}
      </div>
    </form>
  );
}
