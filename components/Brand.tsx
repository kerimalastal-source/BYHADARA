import Link from 'next/link';
import type { Locale } from '@/content/site';
/**
 * The BYHADARA Group wordmark. The name and the "GROUP" line are never translated, and the mark
 * reads left to right in every locale (styles in `.brand`).
 */
export function Wordmark() {
  return (
    <>
      <span>
        BYHADARA<span className="brand-dot">.</span>
      </span>
      <small>G R O U P</small>
    </>
  );
}
/** The wordmark linking home, as shown in the header and footer. */
export function Brand({ locale }: { locale: Locale }) {
  return (
    <Link
      href={`/${locale}`}
      className="brand"
      aria-label="BYHADARA Group"
      lang="en"
      translate="no"
    >
      <Wordmark />
    </Link>
  );
}
