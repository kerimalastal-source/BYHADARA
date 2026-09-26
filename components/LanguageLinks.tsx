'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export function LanguageLinks({ label }: { label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label}>
      {['en', 'ar', 'tr'].map((l) => (
        <Link
          key={l}
          href={pathname.replace(/^\/(en|ar|tr)/, `/${l}`)}
          hrefLang={l}
          lang={l}
          prefetch={false}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
