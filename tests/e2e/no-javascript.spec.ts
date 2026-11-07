import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', switchLabel: 'Español' },
  { path: '/es/', switchLabel: 'English' },
] as const;
const paths = [
  ...pages.map((page) => page.path),
  '/projects/',
  '/projects/cocktail-lab/',
  '/es/projects/streamline-inventory/',
  '/404.html',
];

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  for (const { path, switchLabel } of pages) {
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
      await page.locator('header').getByRole('link', { name: switchLabel }).click();
      await expect(page).toHaveURL(path === '/' ? '/es/' : '/');
    });
  }
});

// Guards the "static first" decision. The only scripts allowed are the two
// small inline ones in the layout (theme before first paint, theme toggle).
// JSON-LD blocks are data, not code, so they are not counted.
// A script with a `src`, or a module preload, means a component is hydrating:
// make that a deliberate change, together with the reason.
test('pages only carry the two inline scripts and load no JavaScript files', async ({
  request,
}) => {
  for (const path of paths) {
    const html = await (await request.get(path)).text();
    const scripts = [...html.matchAll(/<script\b[^>]*>/gi)]
      .map((match) => match[0])
      .filter((tag) => !/type=["']application\/ld\+json/i.test(tag));
    expect(scripts, `${path} has an unexpected number of scripts`).toHaveLength(2);
    for (const tag of scripts) {
      expect(tag, `${path} loads an external script`).not.toMatch(/\ssrc=/i);
      expect(tag, `${path} uses a module script`).not.toMatch(/type=["']module/i);
    }
    expect(html, `${path} preloads a module`).not.toMatch(/modulepreload/i);
  }
});

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  test('the theme toggle stays hidden because it could not work', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-theme-toggle]')).toBeHidden();
  });

  test('the menu on small screens opens with the native disclosure', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'The disclosure only exists on narrow screens.');
    await page.goto('/');
    await page.getByText('Menu', { exact: true }).click();
    await expect(page.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
  });
});
