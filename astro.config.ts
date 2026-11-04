import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// The production origin is injected at deploy time (Phase 8). The localhost
// fallback keeps local builds and CI working without leaking a guessed domain.
const site = process.env['SITE_URL'] ?? 'http://localhost:4321';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
