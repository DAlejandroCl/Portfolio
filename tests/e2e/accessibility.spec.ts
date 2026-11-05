import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/es/'];
const schemes = ['light', 'dark'] as const;
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

for (const colorScheme of schemes) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const route of routes) {
      test(`${route} has no WCAG 2.1 A/AA violations`, async ({ page }) => {
        await page.goto(route);
        const results = await new AxeBuilder({ page }).withTags(tags).analyze();
        const summary = results.violations.map((violation) => ({
          rule: violation.id,
          impact: violation.impact,
          targets: violation.nodes.map((node) => node.target.join(' ')),
        }));
        expect(summary).toEqual([]);
      });
    }
  });
}

test.describe('theme override', () => {
  // Measured background colors of the paper token in each theme.
  const paper = { light: 'rgb(243, 244, 241)', dark: 'rgb(15, 20, 32)' };

  test.use({ colorScheme: 'light' });

  test('follows the system preference by default', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveCSS('background-color', paper.light);
  });

  test('data-theme="dark" wins over a light system preference', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.dataset['theme'] = 'dark';
    });
    await expect(page.locator('html')).toHaveCSS('background-color', paper.dark);
  });

  test('data-theme="light" wins over a dark system preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.dataset['theme'] = 'light';
    });
    await expect(page.locator('html')).toHaveCSS('background-color', paper.light);
  });
});

test.describe('interactive states', () => {
  for (const route of routes) {
    test(`${route} has no violations after switching to the dark theme with the toggle`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto(route);
      await page.locator('[data-theme-toggle]').click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      const results = await new AxeBuilder({ page }).withTags(tags).analyze();
      expect(results.violations.map((violation) => violation.id)).toEqual([]);
    });

    test(`${route} has no violations with the small-screen menu open`, async ({
      page,
      isMobile,
    }) => {
      test.skip(!isMobile, 'The disclosure only exists on narrow screens.');
      await page.goto(route);
      await page.locator('details[data-menu] summary').click();
      const results = await new AxeBuilder({ page }).withTags(tags).analyze();
      expect(results.violations.map((violation) => violation.id)).toEqual([]);
    });
  }
});
