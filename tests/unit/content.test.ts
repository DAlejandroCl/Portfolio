import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { locales } from '../../src/i18n/config';
import { projectSchema } from '../../src/content/schemas';

// Vitest runs from the project root; import.meta.url is not a file URL under happy-dom.
const PROJECTS_DIR = join(process.cwd(), 'src/content/projects');

function frontmatter(file: string): unknown {
  const source = readFileSync(file, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (match?.[1] === undefined) {
    throw new Error(`${file} has no frontmatter.`);
  }
  return parse(match[1]);
}

function slugsFor(locale: string): string[] {
  return readdirSync(join(PROJECTS_DIR, locale))
    .filter((name) => name.endsWith('.md'))
    .map((name) => basename(name, '.md'))
    .sort();
}

const files = locales.flatMap((locale) =>
  slugsFor(locale).map((slug) => ({
    locale,
    slug,
    path: join(PROJECTS_DIR, locale, `${slug}.md`),
  })),
);

describe('project content', () => {
  it('has at least one project per language', () => {
    for (const locale of locales) {
      expect(slugsFor(locale).length).toBeGreaterThan(0);
    }
  });

  it.each(files)('$locale/$slug passes the project schema', ({ path }) => {
    const result = projectSchema.safeParse(frontmatter(path));
    expect(result.success ? [] : result.error.issues).toEqual([]);
  });

  it.each(files)('$locale/$slug is filed under the folder of its language', ({ locale, path }) => {
    const data = projectSchema.parse(frontmatter(path));
    expect(data.lang).toBe(locale);
  });

  it('has the same projects in every language', () => {
    const [first, ...others] = locales.map(slugsFor);
    for (const other of others) {
      expect(other).toEqual(first);
    }
  });

  it('keeps facts identical across languages (numbers, links, status, sources)', () => {
    const [first, ...others] = locales;
    for (const slug of slugsFor(first)) {
      const base = projectSchema.parse(frontmatter(join(PROJECTS_DIR, first, `${slug}.md`)));
      for (const locale of others) {
        const translated = projectSchema.parse(
          frontmatter(join(PROJECTS_DIR, locale, `${slug}.md`)),
        );
        const facts = (data: typeof base) => ({
          status: data.status,
          order: data.order,
          featured: data.featured,
          stack: data.stack,
          links: data.links,
          metrics: data.metrics.map(({ value, evidenceId }) => ({ value, evidenceId })),
          evidence: data.evidence.map(({ id, source, verifiedOn, status }) => ({
            id,
            url: source.url,
            verifiedOn,
            status,
          })),
        });
        expect(facts(translated), `${locale}/${slug} differs from ${first}/${slug}`).toEqual(
          facts(base),
        );
      }
    }
  });
});
