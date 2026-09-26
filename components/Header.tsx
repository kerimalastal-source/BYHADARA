'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { dictionary, locales, navPaths, type Locale } from '@/content/site';
import { Brand } from './Brand';
export function Header({ locale }: { locale: Locale }) {
  const d = dictionary(locale),
    path = usePathname(),
    suffix = path.replace(/^\/(en|ar|tr)/, '');
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panel.current?.querySelector<HTMLAnchorElement>('a');
    first?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
      if (e.key === 'Tab') {
        const els = Array.from(panel.current?.querySelectorAll<HTMLElement>('a,button') || []);
        const first = els[0],
          last = els.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          button.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          button.current?.focus();
        } else if (e.shiftKey && document.activeElement === button.current) {
          e.preventDefault();
          last?.focus();
        }
      }
    }
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener('keydown', key);
    };
  }, [open]);
  const languages = (
    <div className="languages" aria-label={d.language}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${suffix}`}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? 'true' : undefined}
          aria-label={{ en: 'English', ar: 'العربية', tr: 'Türkçe' }[l]}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
  return (
    <header className="header">
      <div className="header-inner">
        <Brand locale={locale} />
        <nav className="desktop-nav" aria-label={d.menu}>
          {navPaths.map((p, i) => (
            <Link
              key={p}
              href={`/${locale}${p ? '/' + p : ''}`}
              aria-current={path === `/${locale}${p ? '/' + p : ''}` ? 'page' : undefined}
            >
              {d.nav[i]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          {languages}
          <Link className="header-contact" href={`/${locale}/contact`}>
            {d.contact}
            <span aria-hidden="true" className="arrow">
              ↗
            </span>
          </Link>
        </div>
        <button
          ref={button}
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? d.close : d.menu}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <nav ref={panel} id="mobile-navigation" className="mobile-nav" aria-label={d.menu}>
          {navPaths.map((p, i) => (
            <Link key={p} href={`/${locale}${p ? '/' + p : ''}`}>
              {d.nav[i]}
            </Link>
          ))}
          <Link href={`/${locale}/contact`}>{d.contact}</Link>
          {languages}
        </nav>
      )}
    </header>
  );
}
