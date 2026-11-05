import { expect, test } from '@playwright/test';

const animationName = (page: import('@playwright/test').Page) =>
  page.locator('.hero-name').evaluate((el) => getComputedStyle(el).animationName);

test.describe('hero width animation', () => {
  test.describe('with motion allowed', () => {
    test.use({ reducedMotion: 'no-preference' });

    test('runs once on wide screens and leaves the layout unchanged', async ({
      page,
      viewport,
    }) => {
      test.skip((viewport?.width ?? 0) < 640, 'The animation is off below the sm breakpoint.');
      await page.goto('/');
      expect(await animationName(page)).toBe('hero-width');
      const style = await page.locator('.hero-name').evaluate((el) => ({
        count: getComputedStyle(el).animationIterationCount,
        height: el.getBoundingClientRect().height,
      }));
      expect(style.count).toBe('1');
      await page.waitForTimeout(900);
      const after = await page
        .locator('.hero-name')
        .evaluate((el) => el.getBoundingClientRect().height);
      expect(after).toBe(style.height);
    });

    test('is off on narrow screens, where wrapping could shift the layout', async ({
      page,
      viewport,
    }) => {
      test.skip((viewport?.width ?? 0) >= 640, 'Only relevant below the sm breakpoint.');
      await page.goto('/');
      expect(await animationName(page)).toBe('none');
    });
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('does not run', async ({ page }) => {
      await page.goto('/');
      expect(await animationName(page)).toBe('none');
    });
  });

  test('causes no layout shift while it runs', async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { shifts: number }).shifts = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as unknown as {
          value: number;
          hadRecentInput: boolean;
        }[]) {
          if (!entry.hadRecentInput)
            (window as unknown as { shifts: number }).shifts += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto('/');
    await page.waitForTimeout(1500);
    const shifts = await page.evaluate(() => (window as unknown as { shifts: number }).shifts);
    expect(shifts).toBeLessThanOrEqual(0.1);
  });
});
