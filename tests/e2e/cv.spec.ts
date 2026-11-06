import { expect, test } from '@playwright/test';

const cases = [
  {
    path: '/',
    hero: 'Download CV (PDF)',
    file: '/cv/Diego_Alejandro_Clavijo_Ladino_Resume.pdf',
  },
  {
    path: '/es/',
    hero: 'Descargar CV (PDF)',
    file: '/cv/Diego_Alejandro_Clavijo_Ladino_CV.pdf',
  },
] as const;

for (const { path, hero, file } of cases) {
  test.describe(path, () => {
    test('offers the CV in the language of the page, in the hero and in contact (FR-03)', async ({
      page,
    }) => {
      await page.goto(path);
      await expect(page.getByRole('link', { name: hero })).toHaveAttribute('href', file);
      await expect(
        page.locator('#contact').getByRole('link', { name: 'CV (PDF)' }),
      ).toHaveAttribute('href', file);
    });

    test('serves the CV as a PDF (AC-12)', async ({ request }) => {
      const response = await request.get(file);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/pdf');
      const bytes = await response.body();
      expect(bytes.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    });
  });
}
