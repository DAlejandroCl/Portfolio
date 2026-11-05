import { expect, test, type Page } from '@playwright/test';

const pages = [
  {
    path: '/',
    skipLabel: 'Skip to content',
    name: 'Diego A. Clavijo',
    links: ['Projects', 'About', 'Contact'],
    menu: 'Menu',
    switchLabel: 'Español',
    theme: 'Dark theme',
    action: 'View projects',
  },
  {
    path: '/es/',
    skipLabel: 'Saltar al contenido',
    name: 'Diego A. Clavijo',
    links: ['Proyectos', 'Acerca de mí', 'Contacto'],
    menu: 'Menú',
    switchLabel: 'English',
    theme: 'Tema oscuro',
    action: 'Ver proyectos',
  },
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

for (const { path, skipLabel, name, links, menu, switchLabel, theme, action } of pages) {
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

    test('tab stops follow the visual order and each has a visible focus ring', async ({
      page,
      isMobile,
    }) => {
      await page.goto(path);

      const expected = isMobile
        ? [skipLabel, name, menu, switchLabel, theme, action]
        : [skipLabel, name, ...links, switchLabel, theme, action];

      const stops: FocusedElement[] = [];
      while (stops.length < expected.length) {
        await page.keyboard.press('Tab');
        const stop = await focusedElement(page);
        if (stop === null) {
          break;
        }
        stops.push(stop);
      }

      expect(stops.map((stop) => stop.text)).toEqual(expected);
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
