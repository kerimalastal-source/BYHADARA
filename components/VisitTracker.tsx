'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
const SESSION_KEY = 'byhadara_visit_session';
/**
 * Anonymous page-view beacon (see `app/api/visit/route.ts`). The session is a random UUID kept in
 * this tab's sessionStorage, never a cookie, and is gone when the tab closes.
 */
export function VisitTracker({ locale }: { locale: string }) {
  const pathname = usePathname();
  const landing = useRef(true);
  useEffect(() => {
    let sessionId: string | null;
    try {
      sessionId = sessionStorage.getItem(SESSION_KEY);
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem(SESSION_KEY, sessionId);
      }
    } catch {
      // Storage blocked or no secure context: the visit is simply not counted.
      return;
    }
    // Only the page the visitor landed on can have an outside referrer; its address is enough.
    let referrer: string | null = null;
    if (landing.current && document.referrer) {
      try {
        const origin = new URL(document.referrer).origin;
        if (origin !== 'null' && origin !== location.origin) referrer = origin;
      } catch {
        // Not a web address: counted as a direct visit.
      }
    }
    // The landing link's campaign tags, such as a link placed in an Instagram bio.
    let utm: Record<string, string | null> | null = null;
    if (landing.current) {
      const query = new URLSearchParams(location.search);
      if (query.get('utm_source'))
        utm = {
          source: query.get('utm_source'),
          medium: query.get('utm_medium'),
          campaign: query.get('utm_campaign'),
        };
    }
    landing.current = false;
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, path: pathname, locale, referrer, utm }),
      keepalive: true,
      credentials: 'omit',
    }).catch(() => {
      // Counting must never affect the page.
    });
  }, [pathname, locale]);
  return null;
}
