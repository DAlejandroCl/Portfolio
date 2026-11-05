import { expect, test } from '@playwright/test';

const paths = ['/', '/es/'];

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  for (const path of paths) {
    test(`${path} shows its content and the hero image`, async ({ page }) => {
      await page.goto(path);
      await expect(
        page.getByRole('heading', { level: 1, name: 'Diego Alejandro Clavijo Ladino' }),
      ).toBeVisible();

      const image = page.getByRole('img').first();
      await expect(image).toBeVisible();
      await expect
        .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
    });

    test(`${path} keeps the language switch working`, async ({ page }) => {
      await page.goto(path);
      await page.locator('header').getByRole('link').click();
      await expect(page).toHaveURL(path === '/' ? '/es/' : '/');
    });
  }
});

// Guards the "static first" decision. If a component ever needs hydration,
// remove it from this list on purpose, together with the reason.
test('pages reference no scripts at all', async ({ request }) => {
  for (const path of paths) {
    const html = await (await request.get(path)).text();
    expect(html, `${path} contains a script tag`).not.toMatch(/<script/i);
    expect(html, `${path} preloads a module`).not.toMatch(/modulepreload/i);
  }
});
