import { expect, test } from '@playwright/test';

const toggle = (page: import('@playwright/test').Page) => page.locator('[data-theme-toggle]');

test.describe('theme toggle', () => {
  test.use({ colorScheme: 'light' });

  test('appears once the script runs and starts from the system preference', async ({ page }) => {
    await page.goto('/');
    await expect(toggle(page)).toBeVisible();
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/);
  });

  test('switches theme, reports its state and remembers the choice', async ({ page }) => {
    await page.goto('/');
    await toggle(page).click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true');
    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const paper = await page.evaluate(
      () => getComputedStyle(document.documentElement).backgroundColor,
    );
    expect(paper).not.toBe('rgb(243, 244, 241)');
    expect(background).toBeTruthy();

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true');

    await toggle(page).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');
  });

  test('applies the saved theme before the page is first painted', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
    });
    await page.goto('/');
    // The head script ran before the body: data-theme is set at DOMContentLoaded.
    const themeAtParse = await page.evaluate(() => document.documentElement.dataset['theme']);
    expect(themeAtParse).toBe('dark');
  });

  test('ignores an invalid saved value', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'sepia');
    });
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/);
  });

  test('can be operated with the keyboard', async ({ page }) => {
    await page.goto('/');
    await toggle(page).focus();
    await page.keyboard.press('Enter');
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Space');
    await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('mobile menu', () => {
  test('closes after choosing a link and the page jumps to the section', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'The disclosure only exists on narrow screens.');
    await page.goto('/');
    const details = page.locator('details[data-menu]');
    await details.locator('summary').click();
    await expect(details).toHaveAttribute('open', '');
    await details.getByRole('link', { name: 'About' }).click();
    await expect(details).not.toHaveAttribute('open', '');
    await expect(page).toHaveURL(/#about$/);
  });
});
