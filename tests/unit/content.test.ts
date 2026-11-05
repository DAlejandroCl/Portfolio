import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { locales } from '../../src/i18n/config';
import { projectSchema, publicationSchema } from '../../src/content/schemas';
import { checkCaseStudy, parseSections } from '../../src/content/sections';

// Vitest runs from the project root; import.meta.url is not a file URL under happy-dom.
const PROJECTS_DIR = join(process.cwd(), 'src/content/projects');

function body(file: string): string {
  const source = readFileSync(file, 'utf8');
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

function frontmatter(file: string): unknown {
  const source = readFileSync(file, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (match?.[1] === undefined) {
    throw new Error(`${file} has no frontmatter.`);
  }
  return parse(match[1]);
}

/** "89.42%" and "89,42 %" are the same number written for two languages. */
export function normalizeNumber(value: string): string {
  return value.replace(/[\s\u00a0]/g, '').replace(',', '.');
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

describe('normalizeNumber', () => {
  it('treats the decimal comma and the spaced percent sign as the same number', () => {
    expect(normalizeNumber('89,42\u00a0%')).toBe(normalizeNumber('89.42%'));
  });

  it('still tells different numbers apart', () => {
    expect(normalizeNumber('89,42\u00a0%')).not.toBe(normalizeNumber('89.43%'));
  });
});

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
          kind: data.kind,
          stack: data.stack,
          links: data.links,
          metrics: data.metrics.map(({ value, evidenceId }) => ({
            value: normalizeNumber(value),
            evidenceId,
          })),
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

describe('publication content', () => {
  const dir = join(process.cwd(), 'src/content/publications');
  const byLocale = locales.map((locale) =>
    readdirSync(join(dir, locale))
      .filter((name) => name.endsWith('.md'))
      .sort()
      .map((name) => ({
        locale,
        name,
        data: publicationSchema.parse(frontmatter(join(dir, locale, name))),
      })),
  );

  it('has the same publications in every language', () => {
    const [first, ...others] = byLocale.map((items) => items.map((item) => item.name));
    for (const other of others) {
      expect(other).toEqual(first);
    }
  });

  it('keeps the facts identical across languages', () => {
    const [first, ...others] = byLocale;
    for (const other of others) {
      other.forEach((item, index) => {
        const base = first?.[index]?.data;
        expect(item.data.title).toBe(base?.title);
        expect(item.data.year).toBe(base?.year);
        expect(item.data.venue).toBe(base?.venue);
        expect(item.data.evidence.source.url).toBe(base?.evidence.source.url);
        expect(item.data.evidence.status).toBe(base?.evidence.status);
      });
    }
  });
});

describe('case study bodies', () => {
  it.each(files)(
    '$locale/$slug has every required section and only cites known evidence',
    ({ path }) => {
      const data = projectSchema.parse(frontmatter(path));
      expect(checkCaseStudy(data, parseSections(body(path)))).toEqual([]);
    },
  );

  it('uses the same section ids in the same order in every language', () => {
    const [first, ...others] = locales;
    for (const slug of slugsFor(first)) {
      const ids = (locale: string) =>
        parseSections(body(join(PROJECTS_DIR, locale, `${slug}.md`))).map((section) => section.id);
      for (const locale of others) {
        expect(ids(locale), `${locale}/${slug} sections differ from ${first}`).toEqual(ids(first));
      }
    }
  });

  it('cites the same evidence in the same sections in every language', () => {
    const [first, ...others] = locales;
    for (const slug of slugsFor(first)) {
      const cited = (locale: string) =>
        parseSections(body(join(PROJECTS_DIR, locale, `${slug}.md`))).map(
          (section) => section.evidenceIds,
        );
      for (const locale of others) {
        expect(cited(locale), `${locale}/${slug} evidence differs from ${first}`).toEqual(
          cited(first),
        );
      }
    }
  });

  it('keeps the feature list identical in status across languages', () => {
    const [first, ...others] = locales;
    for (const slug of slugsFor(first)) {
      const statuses = (locale: string) =>
        projectSchema
          .parse(frontmatter(join(PROJECTS_DIR, locale, `${slug}.md`)))
          .features.map((f) => f.status);
      for (const locale of others) {
        expect(statuses(locale)).toEqual(statuses(first));
      }
    }
  });
});
