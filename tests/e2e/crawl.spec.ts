import { expect, test } from '@playwright/test';
import { en } from '../../src/i18n/dictionaries/en';
import { es } from '../../src/i18n/dictionaries/es';

/** Every string in a dictionary, with its dotted key. */
function leaves(value: unknown, prefix = ''): [string, string][] {
  if (typeof value === 'string') return [[prefix, value]];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => leaves(item, `${prefix}.${index}`));
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, child]) =>
      leaves(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}

/** Interface text that appears on every page. */
const chrome = ['a11y', 'nav', 'theme', 'footer'];
/** Interface text that only the home page has. */
const homeOnly = [
  'hero',
  'focus',
  'expertise',
  'about',
  'contact',
  'projects',
  'status',
  'publication',
  'note',
];

function foreign(from: typeof en, to: typeof es, groups: string[]): string[] {
  const target = new Map(leaves(to));
  return leaves(from)
    .filter(([key, text]) => groups.includes(key.split('.')[0] ?? '') && text.length >= 6)
    .filter(
      ([key, text]) =>
        target.get(key) !== text && !key.endsWith('Lang') && !key.endsWith('otherLanguage'),
    )
    .map(([, text]) => text);
}

async function sitemapPaths(request: import('@playwright/test').APIRequestContext) {
  const index = await (await request.get('/sitemap-index.xml')).text();
  const sitemap = /<loc>([^<]+)<\/loc>/.exec(index)?.[1] ?? '';
  const xml = await (await request.get(new URL(sitemap).pathname)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1] ?? '').pathname);
}

test.describe('every page in the sitemap', () => {
  test('exists, answers 200 and is a page in one language with one h1 (AC-01)', async ({
    page,
    request,
  }) => {
    const paths = await sitemapPaths(request);
    expect(paths.length).toBe(12);
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status(), `${path} status`).toBe(200);
      await expect(page.locator('html'), `${path} lang`).toHaveAttribute(
        'lang',
        path.startsWith('/es/') ? 'es' : 'en',
      );
      await expect(page.getByRole('heading', { level: 1 }), `${path} h1`).toHaveCount(1);
    }
  });

  test('has reciprocal hreflang, a self-referencing canonical and x-default (AC-08)', async ({
    page,
    request,
  }) => {
    const paths = await sitemapPaths(request);
    const alternatesOf = async (path: string) => {
      await page.goto(path);
      const pairs = await page
        .locator('link[rel="alternate"][hreflang]')
        .evaluateAll((links) =>
          links.map((link): [string, string] => [
            link.getAttribute('hreflang') ?? '',
            new URL(link.getAttribute('href') ?? '').pathname,
          ]),
        );
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      return { alternates: Object.fromEntries(pairs) as Record<string, string>, canonical };
    };

    for (const path of paths) {
      const { alternates, canonical } = await alternatesOf(path);
      expect(new URL(canonical ?? '').pathname, `${path} canonical`).toBe(path);
      expect(Object.keys(alternates).sort(), `${path} hreflang set`).toEqual([
        'en',
        'es',
        'x-default',
      ]);
      expect(alternates['x-default'], `${path} x-default`).toBe(alternates['en']);
      expect(alternates[path.startsWith('/es/') ? 'es' : 'en'], `${path} self`).toBe(path);
      const otherPath = alternates[path.startsWith('/es/') ? 'en' : 'es'] ?? '';
      expect(paths, `${path} points at a page that exists`).toContain(otherPath);
      const back = await alternatesOf(otherPath);
      expect(
        back.alternates[path.startsWith('/es/') ? 'es' : 'en'],
        `${otherPath} points back`,
      ).toBe(path);
    }
  });

  test('has no interface text from the other language', async ({ page, request }) => {
    const paths = await sitemapPaths(request);
    for (const path of paths) {
      const isSpanish = path.startsWith('/es/');
      const isHome = path === '/' || path === '/es/';
      const groups = isHome ? [...chrome, ...homeOnly] : chrome;
      const wrong = isSpanish ? foreign(en, es, groups) : foreign(es, en, groups);
      await page.goto(path);
      // Text marked as another language on purpose (WCAG 3.1.2) is not a leak.
      const text = (
        await page.locator('body').evaluate((body) => {
          const copy = body.cloneNode(true) as HTMLElement;
          copy.querySelectorAll('[lang]').forEach((node) => {
            node.remove();
          });
          return copy.textContent;
        })
      ).replace(/\s+/g, ' ');
      const html = await page.content();
      const found = wrong.filter(
        (phrase) =>
          new RegExp(
            `(?<![\\p{L}])${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`,
            'u',
          ).test(text) || html.includes(`aria-label="${phrase}"`),
      );
      expect(found, `${path} contains text from the other language`).toEqual([]);
    }
  });
});

test.describe('language of parts (WCAG 3.1.2)', () => {
  test('marks the English titles on the Spanish page', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.locator('#publication a[lang="en"]')).toHaveCount(1);
    await expect(page.locator('#about [lang="en"]')).toHaveCount(3);
  });

  test('marks the Spanish names on the English page', async ({ page }) => {
    await page.goto('/');
    const names = await page.locator('#about [lang="es"]').allTextContents();
    expect(names).toEqual(['Universidad Católica de Colombia', 'Fundación de Levi']);
    await expect(page.locator('#publication a[lang]')).toHaveCount(0);
  });

  test('does not repeat the page language on text that is already in it', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main [lang="en"]')).toHaveCount(0);
    await page.goto('/es/');
    await expect(page.locator('main [lang="es"]')).toHaveCount(0);
  });
});

test.describe('numbers written for each language', () => {
  test('uses the decimal point in English and the comma in Spanish for the same figure', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.locator('main')).toContainText('Line coverage: 89.42%');
    await page.goto('/es/');
    await expect(page.locator('main')).toContainText('Cobertura de líneas: 89,42 %');
    await page.goto('/es/projects/cocktail-lab/');
    await expect(page.locator('main')).toContainText('89,42 %');
  });
});
