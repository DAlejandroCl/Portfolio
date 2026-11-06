import { expect, test } from '@playwright/test';

const homes = ['/', '/es/'];

test('robots.txt allows crawling and names the sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain('User-agent: *');
  expect(body).toContain('Allow: /');
  expect(body).toMatch(/^Sitemap: https?:\/\/[^\s]+\/sitemap-index\.xml$/m);
});

test('the favicon and the social image exist', async ({ request }) => {
  for (const path of ['/favicon.svg', '/og.png']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});

for (const path of homes) {
  test.describe(path, () => {
    test('links the favicon and a social image with its description', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
      const image = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(new URL(image ?? '').pathname).toBe('/og.png');
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
        'content',
        /Diego Alejandro/,
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image',
      );
    });

    test('carries valid structured data for the person and the paper', async ({ page }) => {
      await page.goto(path);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((nodes) => nodes.map((node) => node.textContent));
      const parsed = blocks.map((block) => JSON.parse(block) as Record<string, unknown>);
      expect(parsed.map((item) => item['@type'])).toEqual(['Person', 'ScholarlyArticle']);
      const [person, article] = parsed;
      expect(person?.['sameAs']).toEqual([
        'https://github.com/DAlejandroCl',
        'https://www.linkedin.com/in/dalejandrocl/',
      ]);
      expect(article?.['url']).toBe('https://ieeexplore.ieee.org/document/10854835');
      expect(JSON.stringify(parsed)).not.toMatch(/@gmail|mailto/);
    });
  });
}

test('pages other than the home pages carry no structured data', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
});
