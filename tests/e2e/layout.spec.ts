import { expect, test, type Page } from '@playwright/test';

const routes = ['/', '/es/'];
const widths = [320, 375, 768, 1024, 1440];

async function horizontalOverflow(page: Page): Promise<number> {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

test.describe('responsive layout', () => {
  // Mobile projects already use their own device viewport.
  test.skip(({ isMobile }) => isMobile, 'covered by the explicit widths on desktop projects');

  for (const route of routes) {
    for (const width of widths) {
      test(`${route} has no horizontal scroll at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(route);
        expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      });
    }

    test(`${route} still fits when text is enlarged to 200%`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(route);
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '200%';
      });
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    });
  }
});
