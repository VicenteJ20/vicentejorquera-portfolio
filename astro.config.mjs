// vicentejorquera.dev — Astro configuration
// Docs: https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Pre-production (QA) domain on Cloudflare Pages — switch back to https://vicentejorquera.dev when the custom domain goes live
site: 'https://vicentejorquera-portfolio.pages.dev',

  // i18n: English is the primary language, served at the root (/).
  // Spanish is served under /es/. Switch via the header language toggle.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-CL' },
      },
    }),
  ],

  markdown: {
    shikiConfig: {
      themes: { dark: 'github-dark-default', light: 'github-light-default' },
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
