'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { dictionary, type Locale } from '@/content/site';
import { getFormText } from '@/content/forms';
import {
  checkPdf,
  inquirySchema,
  sectors,
  opportunities,
  partnerTypes,
} from '@/lib/inquiry-schema';
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}
export function InquiryForm({
  locale,
  kind,
  enabled,
  siteKey,
}: {
  locale: Locale;
  kind: 'investment' | 'partnership';
  enabled: boolean;
  siteKey: string;
}) {
  const t = getFormText(locale),
    d = dictionary(locale),
    form = useRef<HTMLFormElement>(null),
    widget = useRef<HTMLDivElement>(null),
    widgetId = useRef<string | undefined>(undefined),
    status = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({}),
    [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle'),
    [message, setMessage] = useState(''),
    [token, setToken] = useState(''),
    [ready, setReady] = useState(false);
  const started = useRef(0),
    requestId = useRef('');
  useEffect(() => {
    started.current = Date.now();
    requestId.current = crypto.randomUUID();
  }, []);
  useEffect(() => {
    if (!ready || !enabled || !window.turnstile || !widget.current) return;
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: siteKey,
      language: locale,
      action: 'inquiry',
      callback: (v: string) => setToken(v),
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
    });
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
    };
  }, [ready, enabled, locale, siteKey]);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!enabled || state === 'loading') return;
    const fd = new FormData(form.current!);
    fd.set('kind', kind);
    fd.set('locale', locale);
    fd.set('startedAt', String(started.current));
    fd.set('requestId', requestId.current);
    fd.set('token', token);
    const parsed = inquirySchema.safeParse(Object.fromEntries(fd));
    const next: Record<string, string> = {};
    if (!parsed.success)
      for (const issue of parsed.error.issues)
        next[String(issue.path[0])] =
          issue.path[0] === 'consent'
            ? t.consentError
            : issue.path[0] === 'token'
              ? t.challenge
              : t.required;
    const attachment = fd.get('attachment');
    if (attachment instanceof File && attachment.size && !(await checkPdf(attachment)))
      next.attachment = t.fileError;
    setErrors(next);
    if (Object.keys(next).length) {
      setMessage(t.invalid);
      setState('error');
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setState('loading');
    setMessage('');
    try {
      const res = await fetch('/api/inquiries', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.accepted === true && typeof data.id === 'string') {
        setState('success');
        setMessage(`${t.success} ${t.reference}: ${data.id}`);
        form.current?.reset();
      } else {
        setState('error');
        setMessage(
          res.status === 429
            ? t.rate
            : res.status === 422
              ? t.invalid
              : res.status === 403
                ? t.challenge
                : t.error,
        );
        if (data.fields)
          setErrors(Object.fromEntries(data.fields.map((f: string) => [f, t.required])));
      }
    } catch {
      setState('error');
      setMessage(t.error);
    } finally {
      setToken('');
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      setTimeout(() => status.current?.focus(), 0);
    }
  }
  function field(
    name: string,
    label: string,
    opts: {
      type?: string;
      values?: readonly string[];
      labels?: string[];
      wide?: boolean;
      auto?: string;
      max?: number;
    } = {},
  ) {
    return (
      <div className={`field ${opts.wide ? 'wide' : ''}`} key={name}>
        <label htmlFor={name}>{label}</label>
        {opts.values ? (
          <select
            id={name}
            name={name}
            required
            defaultValue=""
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          >
            <option value="">{t.select}</option>
            {opts.values.map((v, i) => (
              <option value={v} key={v}>
                {opts.labels?.[i] || v}
              </option>
            ))}
          </select>
        ) : name === 'description' ? (
          <textarea
            id={name}
            name={name}
            required
            minLength={30}
            maxLength={5000}
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={opts.type || 'text'}
            required
            maxLength={opts.max || 180}
            autoComplete={opts.auto}
            dir={['email', 'phone', 'website'].includes(name) ? 'ltr' : undefined}
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          />
        )}{' '}
        {errors[name] && (
          <span id={`${name}-error`} className="field-error">
            {errors[name]}
          </span>
        )}
      </div>
    );
  }
  if (state === 'success')
    return (
      <div ref={status} role="status" tabIndex={-1} className="notice form-status">
        {message}
      </div>
    );
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      aria-label={kind === 'investment' ? d.investmentTitle : d.partnershipFormTitle}
    >
      <p className="form-required">{t.requiredNote}</p>
      {!enabled && (
        <div className="notice" style={{ marginBottom: 28 }}>
          {d.formUnavailable}
        </div>
      )}
      <fieldset
        disabled={!enabled || state === 'loading'}
        style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}
      >
        <div className="form-grid">
          {field('name', kind === 'investment' ? t.name : t.contactPerson, {
            auto: 'name',
            max: 120,
          })}
          {field('company', t.company, { auto: 'organization' })}
          {field('email', t.email, { type: 'email', auto: 'email', max: 254 })}
          {field('phone', t.phone, { type: 'tel', auto: 'tel', max: 30 })}
          {field('country', t.country, { auto: 'country-name', max: 80 })}
          {kind === 'investment' ? (
            <>
              {field('sector', t.sector, { values: sectors, labels: t.sectors })}
              {field('opportunity', t.opportunity, {
                values: opportunities,
                labels: t.opportunities,
                wide: true,
              })}
            </>
          ) : (
            <>
              {field('website', t.website, { type: 'url', auto: 'url', max: 300 })}
              {field('industry', t.industry, { max: 100 })}
              {field('partnership', t.partnership, { values: partnerTypes, labels: t.partners })}
            </>
          )}
          {field('description', t.description, { wide: true })}
          <div className="field wide">
            <label htmlFor="attachment">{t.attachment}</label>
            <input
              id="attachment"
              name="attachment"
              type="file"
              accept="application/pdf,.pdf"
              aria-describedby="attachment-help attachment-error"
              aria-invalid={!!errors.attachment}
            />
            <small id="attachment-help">{t.fileHelp}</small>
            <span id="attachment-error" className="field-error">
              {errors.attachment}
            </span>
          </div>
        </div>
        <div className="hp" aria-hidden="true">
          <label htmlFor="websiteTrap">Website</label>
          <input id="websiteTrap" name="websiteTrap" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="consent">
          <input
            name="consent"
            type="checkbox"
            value="yes"
            required
            aria-invalid={!!errors.consent}
            aria-describedby="consent-error"
          />
          <span>
            {t.consent} <Link href={`/${locale}/privacy`}>{d.privacy}</Link>.
          </span>
        </label>
        <p className="field-error" id="consent-error">
          {errors.consent}
        </p>
        {enabled && (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              onReady={() => setReady(true)}
            />
            <div ref={widget} aria-label={t.security} />
            <p className="field-error">{errors.token}</p>
          </>
        )}
        <button
          className="button form-submit"
          disabled={!enabled || state === 'loading'}
          type="submit"
        >
          {state === 'loading' ? t.submitting : t.submit}
          <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
      <div className="form-status" role="status" ref={status} tabIndex={-1}>
        {message}
      </div>
    </form>
  );
}
