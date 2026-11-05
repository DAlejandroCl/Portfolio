import { expect, test, type Page } from '@playwright/test';

const pages = [
  { path: '/', skipLabel: 'Skip to content', switchLabel: 'Español' },
  { path: '/es/', skipLabel: 'Saltar al contenido', switchLabel: 'English' },
] as const;

interface FocusedElement {
  text: string;
  outlineStyle: string;
  outlineWidth: string;
}

async function focusedElement(page: Page): Promise<FocusedElement | null> {
  return page.evaluate(() => {
    const element = document.activeElement;
    if (!(element instanceof HTMLElement) || element === document.body) {
      return null;
    }
    const style = getComputedStyle(element);
    return {
      text: element.textContent.trim(),
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });
}

for (const { path, skipLabel, switchLabel } of pages) {
  test.describe(path, () => {
    test('the skip link is the first tab stop and moves focus to the main content', async ({
      page,
    }) => {
      await page.goto(path);
      await page.keyboard.press('Tab');

      const skipLink = page.getByRole('link', { name: skipLabel });
      await expect(skipLink).toBeFocused();
      await expect(skipLink).toBeVisible();

      await page.keyboard.press('Enter');
      await expect(page.locator('main')).toBeFocused();
    });

    test('every tab stop has a visible focus ring, in a logical order', async ({ page }) => {
      await page.goto(path);

      const stops: FocusedElement[] = [];
      for (let index = 0; index < 10; index += 1) {
        await page.keyboard.press('Tab');
        const stop = await focusedElement(page);
        if (stop === null) {
          break;
        }
        stops.push(stop);
      }

      // Skip link, language switch, then the source link of the hero's margin note.
      expect(stops.map((stop) => stop.text)).toEqual([
        skipLabel,
        switchLabel,
        expect.stringMatching(/Cocktail Lab/) as unknown as string,
      ]);
      for (const stop of stops) {
        expect(stop.outlineStyle, `${stop.text} has no focus outline`).toBe('solid');
        expect(
          parseFloat(stop.outlineWidth),
          `${stop.text} focus outline is too thin`,
        ).toBeGreaterThanOrEqual(2);
      }
    });
  });
}
