import { expect, test } from '@playwright/test';

const pages = [
  {
    path: '/',
    sections: [
      'Projects',
      'Engineering focus',
      'Technical expertise',
      'About',
      'Academic publication',
      'Contact',
    ],
    projects: ['Cocktail Lab', 'Streamline Inventory', 'Weather Finder', 'Calorie Tracker'],
    status: { 'Streamline Inventory': 'In active development', 'Weather Finder': 'Completed' },
  },
  {
    path: '/es/',
    sections: [
      'Proyectos',
      'Enfoque de ingeniería',
      'Experiencia técnica',
      'Acerca de mí',
      'Publicación académica',
      'Contacto',
    ],
    projects: ['Cocktail Lab', 'Streamline Inventory', 'Weather Finder', 'Calorie Tracker'],
    status: { 'Streamline Inventory': 'En desarrollo activo', 'Weather Finder': 'Terminado' },
  },
] as const;

for (const { path, sections, projects, status } of pages) {
  test.describe(path, () => {
    test('has the sections in order, each with its own h2', async ({ page }) => {
      await page.goto(path);
      const headings = await page.getByRole('heading', { level: 2 }).allTextContents();
      expect(headings).toEqual(sections);
    });

    test('has one landmark of each kind', async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('banner')).toHaveCount(1);
      await expect(page.getByRole('main')).toHaveCount(1);
      await expect(page.getByRole('contentinfo')).toHaveCount(1);
      await expect(page.getByRole('navigation')).toHaveCount(1);
    });

    test('never skips a heading level', async ({ page }) => {
      await page.goto(path);
      const levels = await page
        .locator('h1, h2, h3, h4')
        .evaluateAll((nodes) => nodes.map((node) => Number(node.tagName.slice(1))));
      levels.reduce((previous, level) => {
        expect(
          level - previous,
          `heading jumps from h${previous} to h${level}`,
        ).toBeLessThanOrEqual(1);
        return level;
      }, 0);
    });

    test('lists every project from the content collection with its status in words', async ({
      page,
    }) => {
      await page.goto(path);
      const titles = await page.locator('#projects h3').allTextContents();
      expect(titles.map((title) => title.replace(/\s+—.*$/, '').trim())).toEqual(projects);
      for (const [project, label] of Object.entries(status)) {
        const row = page.locator('#projects article', { hasText: project });
        await expect(row).toContainText(label);
      }
    });

    test('puts React and TypeScript first in every stack and never uses bars or ratings', async ({
      page,
    }) => {
      await page.goto(path);
      const first = await page
        .locator('#projects article')
        .evaluateAll((rows) =>
          rows.map((row) => row.querySelector('p.text-note')?.textContent.slice(0, 17)),
        );
      for (const text of first) {
        expect(text).toBe('React, TypeScript');
      }
      await expect(page.locator('progress, meter, [role="progressbar"]')).toHaveCount(0);
    });

    test('publishes the paper with its source and says the date is provided by the author', async ({
      page,
    }) => {
      await page.goto(path);
      const section = page.locator('#publication');
      await expect(
        section.getByRole('link', { name: /Security Model with a Holistic Approach/ }),
      ).toHaveAttribute('href', 'https://ieeexplore.ieee.org/document/10854835');
      await expect(section.locator('[data-status="stated"]')).toHaveCount(1);
      await expect(section).not.toContainText(/Checked on|Comprobado el/);
    });

    test('contact is by links only, with email as a mailto link and no phone number', async ({
      page,
    }) => {
      await page.goto(path);
      const contact = page.locator('#contact');
      await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(1);
      await expect(contact.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/dalejandrocl/',
      );
      await expect(contact.locator('a[href^="tel:"]')).toHaveCount(0);
      // Ten or more digits in a row, with the separators phone numbers use.
      const visible = await page.locator('body').innerText();
      expect(visible).not.toMatch(/(?:\+?\d[\s().-]?){10,}/);
      expect(await contact.textContent()).not.toContain('@');
    });

    test('every external link opens safely and no link is empty', async ({ page }) => {
      await page.goto(path);
      const external = await page
        .locator('a[href^="http"]')
        .evaluateAll((links) =>
          links.map((link) => ({ href: link.getAttribute('href'), rel: link.getAttribute('rel') })),
        );
      expect(external.length).toBeGreaterThan(0);
      for (const link of external) {
        expect(link.rel, `${link.href} lacks rel`).toContain('noopener');
        expect(link.rel, `${link.href} lacks rel`).toContain('noreferrer');
      }
      const names = await page
        .getByRole('link')
        .evaluateAll((links) => links.map((link) => link.textContent.trim()));
      expect(names.filter((name) => name === '')).toEqual([]);
    });

    test('the view projects button goes to the projects section', async ({ page }) => {
      await page.goto(path);
      await page
        .locator('main')
        .getByRole('link', { name: /View projects|Ver proyectos/ })
        .click();
      await expect(page).toHaveURL(/#projects$/);
      await expect(page.locator('#projects')).toBeInViewport();
    });
  });
}

test('the Spanish page does not carry English interface text', async ({ page }) => {
  await page.goto('/es/');
  const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
  for (const phrase of [
    'Engineering focus',
    'View projects',
    'Skip to content',
    'Checked on',
    'Get in touch',
  ]) {
    expect(text).not.toContain(phrase);
  }
});
