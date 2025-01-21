import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// export const routing = defineRouting({
//   // A list of all locales that are supported
//   locales: ['en', 'cs'],
  
//   // Used when no locale matches
//   defaultLocale: 'en'
// });

export const routing = defineRouting({
  locales: ['en', 'cs'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/o-mne': {
      en: '/about',
      cs: '/o-mne'
    },
    '/sluzby': {
      en: '/services',
      cs: '/služby'
    },
    '/kontakt': {
      en: '/contact',
      cs: '/kontakt'
    },
  },
  fallbackLocale: 'en',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = 
  createNavigation(routing);