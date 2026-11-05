import { expect, test } from '@playwright/test';

const pages = [
  { locale: 'en', path: '/', otherPath: '/es/', otherLocale: 'es', switchLabel: 'Español' },
  { locale: 'es', path: '/es/', otherPath: '/', otherLocale: 'en', switchLabel: 'English' },
] as const;

for (const { locale, path, otherPath, otherLocale, switchLabel } of pages) {
  test.describe(`${locale} home`, () => {
    test('declares its language and has exactly one h1', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    });

    test('has a title, a description and a canonical URL for this page', async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/Diego Alejandro Clavijo Ladino/);

      const description =
        (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
      expect(description.length).toBeGreaterThanOrEqual(50);
      expect(description.length).toBeLessThanOrEqual(160);

      const canonical = (await page.locator('link[rel="canonical"]').getAttribute('href')) ?? '';
      expect(new URL(canonical).pathname).toBe(path);
    });

    test('lists reciprocal hreflang alternates and x-default', async ({ page }) => {
      await page.goto(path);
      const alternates = await page
        .locator('link[rel="alternate"][hreflang]')
        .evaluateAll((links) =>
          links.map((link) => [
            link.getAttribute('hreflang') ?? '',
            new URL(link.getAttribute('href') ?? '', 'http://x').pathname,
          ]),
        );
      expect(Object.fromEntries(alternates)).toEqual({ en: '/', es: '/es/', 'x-default': '/' });
    });

    test('sets Open Graph locale for this page and its alternate', async ({ page }) => {
      await page.goto(path);
      const expected = { en: 'en_US', es: 'es_LA' };
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        'content',
        expected[locale],
      );
      await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute(
        'content',
        expected[otherLocale],
      );
    });

    test('links to the same page in the other language', async ({ page }) => {
      await page.goto(path);
      await page.locator('header').getByRole('link', { name: switchLabel }).click();
      await expect(page).toHaveURL(otherPath);
      await expect(page.locator('html')).toHaveAttribute('lang', otherLocale);
    });
  });
}

test('the two languages have different titles and descriptions', async ({ page }) => {
  const read = async (path: string) => {
    await page.goto(path);
    return {
      title: await page.title(),
      description: await page.locator('meta[name="description"]').getAttribute('content'),
    };
  };
  const english = await read('/');
  const spanish = await read('/es/');
  expect(spanish.title).not.toBe(english.title);
  expect(spanish.description).not.toBe(english.description);
});

test.describe('sitemap', () => {
  test('lists every page in both languages with reciprocal alternates and leaves out the 404', async ({
    request,
  }) => {
    const index = await (await request.get('/sitemap-index.xml')).text();
    const sitemapUrl = /<loc>([^<]+)<\/loc>/.exec(index)?.[1] ?? '';
    const xml = await (await request.get(new URL(sitemapUrl).pathname)).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1] ?? '').pathname,
    );
    for (const slug of [
      'cocktail-lab',
      'streamline-inventory',
      'weather-finder',
      'calorie-tracker',
    ]) {
      expect(locs).toContain(`/projects/${slug}/`);
      expect(locs).toContain(`/es/projects/${slug}/`);
    }
    expect(locs).toContain('/projects/');
    expect(locs).toContain('/es/projects/');
    expect(locs.some((loc) => loc.includes('404'))).toBe(false);
    expect(xml).toContain('hreflang="es"');
  });
});
