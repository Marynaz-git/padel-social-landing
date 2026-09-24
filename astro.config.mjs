// @ts-check
import { defineConfig } from 'astro/config';

// TODO: replace with the confirmed production domain (used for canonical + OG URLs).
const env = /** @type {any} */ (globalThis).process?.env ?? {};
// Canonical/OG domain: PUBLIC_SITE_URL wins; on Vercel the production domain is picked up automatically.
const SITE_URL =
  env.PUBLIC_SITE_URL ||
  (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://padel-social.vercel.app');

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  image: { responsiveStyles: false },
});
