/**
 * Renders `public/og.png` (1200x630) from the design tokens and the bundled
 * fonts. Run with `pnpm og` after changing the name, role or palette.
 * The image carries only the name and the role, so one file serves both languages.
 */
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { en } from '../src/i18n/dictionaries/en.ts';

const font = (path: string) =>
  `data:font/woff2;base64,${readFileSync(new URL(`../node_modules/${path}`, import.meta.url)).toString('base64')}`;

const html = `<!doctype html><html><head><style>
@font-face { font-family: Archivo; src: url(${font('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')}); font-weight: 100 900; }
body { margin: 0; width: 1200px; height: 630px; background: #f3f4f1; color: #1b2233; font-family: Archivo, sans-serif; display: flex; flex-direction: column; justify-content: center; padding: 0 96px; box-sizing: border-box; border-left: 24px solid #3a33d1; }
h1 { margin: 0; font-size: 92px; line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; }
p { margin: 28px 0 0; font-size: 40px; font-weight: 500; color: #4b5363; }
</style></head><body><h1>${en.site.firstNames}<br />${en.site.lastNames}</h1><p>${en.site.role}</p></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL('../public/og.png', import.meta.url).pathname });
await browser.close();
