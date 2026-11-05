import { expect, test } from '@playwright/test';

const slugs = {
  'cocktail-lab': { title: 'Cocktail Lab', sections: 11 },
  'streamline-inventory': { title: 'Streamline Inventory', sections: 11 },
  'weather-finder': { title: 'Weather Finder', sections: 6 },
  'calorie-tracker': { title: 'Calorie Tracker', sections: 6 },
} as const;

const locales = [
  { prefix: '', other: '/es', switchLabel: 'Español', projects: 'Projects' },
  { prefix: '/es', other: '', switchLabel: 'English', projects: 'Proyectos' },
] as const;

for (const { prefix, other, switchLabel, projects } of locales) {
  for (const [slug, { title, sections }] of Object.entries(slugs)) {
    const path = `${prefix}/projects/${slug}/`;

    test.describe(path, () => {
      test('has one h1, the right number of sections and a working table of contents', async ({
        page,
      }) => {
        await page.goto(path);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
        await expect(page.locator('main > section')).toHaveCount(sections);

        const targets = await page
          .locator('header nav[aria-label] a[href^="#"]')
          .evaluateAll((links) => links.map((link) => link.getAttribute('href')?.slice(1) ?? ''));
        expect(targets).toHaveLength(sections);
        for (const id of targets) {
          await expect(page.locator(`section#${id}`)).toHaveCount(1);
        }
      });

      test('links back to the project list in its own language and marks the current page', async ({
        page,
      }) => {
        await page.goto(path);
        const crumbs = page.locator('nav[aria-label] ol');
        await expect(crumbs.getByRole('link', { name: projects })).toHaveAttribute(
          'href',
          `${prefix}/projects/`,
        );
        await expect(crumbs.locator('[aria-current="page"]')).toHaveText(title);
      });

      test('switches to the same page in the other language', async ({ page }) => {
        await page.goto(path);
        await page.locator('header').getByRole('link', { name: switchLabel }).click();
        await expect(page).toHaveURL(`${other}/projects/${slug}/`);
      });

      test('declares itself and its translation to search engines', async ({ page }) => {
        await page.goto(path);
        const canonical = (await page.locator('link[rel="canonical"]').getAttribute('href')) ?? '';
        expect(new URL(canonical).pathname).toBe(path);
        const pairs = await page
          .locator('link[rel="alternate"][hreflang]')
          .evaluateAll((links) =>
            links.map((link): [string, string] => [
              link.getAttribute('hreflang') ?? '',
              new URL(link.getAttribute('href') ?? '').pathname,
            ]),
          );
        const alternates: Record<string, string> = Object.fromEntries(pairs);
        expect(alternates).toEqual({
          en: `/projects/${slug}/`,
          es: `/es/projects/${slug}/`,
          'x-default': `/projects/${slug}/`,
        });
        const description =
          (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
        expect(description.length).toBeGreaterThanOrEqual(50);
        expect(description.length).toBeLessThanOrEqual(160);
      });

      test('every margin note names its status and links to an https source', async ({ page }) => {
        await page.goto(path);
        const notes = page.locator('[data-status]');
        expect(await notes.count()).toBeGreaterThan(0);
        const data = await notes.evaluateAll((elements) =>
          elements.map((element) => ({
            status: element.getAttribute('data-status'),
            text: element.textContent,
            href: element.querySelector('a')?.getAttribute('href') ?? '',
          })),
        );
        for (const note of data) {
          expect(['verified', 'target', 'stated']).toContain(note.status);
          expect(note.href).toMatch(/^https:\/\/(github\.com|ieeexplore\.ieee\.org)\//);
          expect(note.text).toMatch(/\d{4}/);
        }
      });

      test('external links open safely and none is empty', async ({ page }) => {
        await page.goto(path);
        const rels = await page
          .locator('main a[href^="http"]')
          .evaluateAll((links) => links.map((link) => link.getAttribute('rel') ?? ''));
        for (const rel of rels) {
          expect(rel).toContain('noopener');
        }
        const names = await page
          .getByRole('link')
          .evaluateAll((links) => links.map((link) => link.textContent.trim()));
        expect(names.filter((name) => name === '')).toEqual([]);
      });

      test('never skips a heading level and has no horizontal overflow', async ({ page }) => {
        await page.goto(path);
        const levels = await page
          .locator('h1, h2, h3, h4')
          .evaluateAll((nodes) => nodes.map((node) => Number(node.tagName.slice(1))));
        levels.reduce((previous, level) => {
          expect(level - previous).toBeLessThanOrEqual(1);
          return level;
        }, 0);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    });
  }
}

test.describe('Streamline Inventory is honest about its state', () => {
  test('labels every feature with a status in words and admits what is in progress', async ({
    page,
  }) => {
    await page.goto('/projects/streamline-inventory/');
    const features = page.locator('#features li');
    expect(await features.count()).toBeGreaterThanOrEqual(8);
    for (const text of await features.allTextContents()) {
      expect(text).toMatch(/Implemented|In progress|Planned/);
    }
    await expect(page.locator('#features')).toContainText('In progress');
    await expect(page.locator('#lessons')).toContainText('default administrator account');
    await expect(page.locator('#lessons')).toContainText('No versioned migrations');
  });

  test('says in Spanish the same limitations', async ({ page }) => {
    await page.goto('/es/projects/streamline-inventory/');
    await expect(page.locator('#features')).toContainText('En curso');
    await expect(page.locator('#lessons')).toContainText('cuenta de administrador por defecto');
  });

  test('has no live demo link, because the project is not deployed', async ({ page }) => {
    await page.goto('/projects/streamline-inventory/');
    await expect(page.getByRole('link', { name: /Live demo|Demo en vivo/ })).toHaveCount(0);
  });
});

test.describe('numbers and claims that must not appear', () => {
  test('Streamline does not quote a test count or claim Docker, Turborepo or migrations', async ({
    page,
  }) => {
    await page.goto('/projects/streamline-inventory/');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/\b312\b/);
    expect(text).not.toMatch(/Docker|Turborepo|pnpm/);
  });

  test('Cocktail Lab does not claim a test count or Lighthouse figures', async ({ page }) => {
    await page.goto('/projects/cocktail-lab/');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/1,00[34]/);
    expect(text).toContain('89.42%');
    expect(text).not.toMatch(/Lighthouse score|score of \d+/);
  });
});

test.describe('project list page', () => {
  for (const { prefix, projects } of locales) {
    test(`${prefix || '/'}projects/ lists the four projects with links to their case studies`, async ({
      page,
    }) => {
      await page.goto(`${prefix}/projects/`);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(projects);
      const hrefs = await page
        .locator('article h3 a')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
      expect(hrefs).toEqual(Object.keys(slugs).map((slug) => `${prefix}/projects/${slug}/`));
    });
  }
});

test.describe('home page rows and focus links lead somewhere real', () => {
  test('each project row opens its case study', async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects article h3 a').first().click();
    await expect(page).toHaveURL('/projects/cocktail-lab/');
  });

  test('each engineering focus item links to a section that exists', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page
      .locator('#focus a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
    expect(hrefs).toHaveLength(4);
    for (const href of hrefs) {
      const [path, hash] = href.split('#');
      await page.goto(path ?? '/');
      await expect(page.locator(`section#${hash}`)).toHaveCount(1);
    }
  });

  test('the Spanish focus links stay in Spanish', async ({ page }) => {
    await page.goto('/es/');
    const hrefs = await page
      .locator('#focus a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
    for (const href of hrefs) {
      expect(href.startsWith('/es/projects/')).toBe(true);
    }
  });
});

test.describe('not found page', () => {
  test('answers 404, is kept out of search results and offers both languages', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page does not exist.');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute(
      'href',
      '/',
    );
    const spanish = page.locator('[lang="es"]');
    await expect(spanish.getByRole('heading')).toHaveText('Esta página no existe.');
    await expect(spanish.getByRole('link', { name: 'Ir a la página de inicio' })).toHaveAttribute(
      'href',
      '/es/',
    );
  });

  test('the language switch goes to the home page of the other language', async ({ page }) => {
    await page.goto('/this-page-does-not-exist/');
    await page.locator('header').getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL('/es/');
  });
});
