'use client';
import dynamic from 'next/dynamic';
/**
 * The contact form in its own client bundle, so its validation code is downloaded only on the
 * three pages that show a form. It is still rendered on the server, so the form appears at once.
 */
export const LazyContactForm = dynamic(() => import('./ContactForm').then((m) => m.ContactForm));
