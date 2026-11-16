/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  SINGLE SOURCE OF TRUTH — edit this file to update the site │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Everything public (name, role, email, socials, URL) lives here.
 * ⚠️  The values marked PLACEHOLDER are guesses — replace them
 *     with your real handles/email before publishing.
 */

export const SITE = {
  name: 'Vicente Jorquera',
  url: 'https://vicentejorquera.dev',
  /** Browser tab + SEO default title */
  defaultTitle: 'Vicente Jorquera — Software Architect · Architecture & AI Consulting',
  /** Shown next to the name in the header/footer */
  role: {
    en: 'Software Architect · Architecture & AI',
    es: 'Arquitecto de Software · Arquitectura e IA',
  },
  locale: {
    en: { htmlLang: 'en', ogLocale: 'en_US' },
    es: { htmlLang: 'es', ogLocale: 'es_CL' },
  },
  // ⚠️ PLACEHOLDERS — change me
  email: 'contacto@vicentejorquera.dev',
  github: 'https://github.com/VicenteJ20',
  linkedin: 'https://www.linkedin.com/in/vicentejorquera',
  /** X (Twitter) handle — used for twitter:site / twitter:creator and sameAs */
  twitter: '@jvicente_20',
  // Where the RSS feeds point to
  rss: { en: '/rss.xml', es: '/es/rss.xml' },
  // ⚠️ Paste your Cloudflare Web Analytics token here (e.g. 'a1b2c3...').
  //    Leave empty to disable the beacon entirely.
  cfAnalyticsToken: '',
} as const;

export type Lang = 'en' | 'es';

/** Tags shown on the blog index as quick filters (slug → display label) */
export const FEATURED_TAGS = ['architecture', 'ai', 'cloud', 'fullstack', 'consulting'];
