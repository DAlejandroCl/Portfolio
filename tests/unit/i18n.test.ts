import { describe, expect, it } from 'vitest';
import { defaultLocale, isLocale } from '../../src/i18n/config';
import { en } from '../../src/i18n/dictionaries/en';
import { es } from '../../src/i18n/dictionaries/es';
import {
  alternateLinks,
  canonicalUrl,
  formatDate,
  getDictionary,
  getLocaleFromPath,
  localizedPath,
  normalizePath,
  stripLocale,
} from '../../src/i18n/utils';

const SITE = 'https://example.dev';

function leaves(value: unknown, prefix = ''): [string, string][] {
  if (typeof value === 'string') {
    return [[prefix, value]];
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, child]) =>
      leaves(child, prefix === '' ? key : `${prefix}.${key}`),
    );
  }
  return [];
}

describe('paths', () => {
  it('normalizes slashes', () => {
    expect(normalizePath('projects')).toBe('/projects/');
    expect(normalizePath('/projects')).toBe('/projects/');
    expect(normalizePath('/')).toBe('/');
  });

  it('detects the locale from the first path segment', () => {
    expect(getLocaleFromPath('/')).toBe('en');
    expect(getLocaleFromPath('/projects/cocktail-lab/')).toBe('en');
    expect(getLocaleFromPath('/es/')).toBe('es');
    expect(getLocaleFromPath('/es/projects/')).toBe('es');
  });

  it('does not mistake a path that merely starts with a locale code', () => {
    expect(getLocaleFromPath('/espresso/')).toBe('en');
  });

  it('strips the locale prefix', () => {
    expect(stripLocale('/es/')).toBe('/');
    expect(stripLocale('/es/projects/cocktail-lab/')).toBe('/projects/cocktail-lab/');
    expect(stripLocale('/projects/')).toBe('/projects/');
  });

  it('builds the equivalent path in each locale', () => {
    expect(localizedPath('es', '/')).toBe('/es/');
    expect(localizedPath('es', '/projects/')).toBe('/es/projects/');
    expect(localizedPath('en', '/es/projects/')).toBe('/projects/');
    expect(localizedPath('es', '/es/projects/')).toBe('/es/projects/');
  });
});

describe('metadata links', () => {
  it('builds an absolute canonical URL with a trailing slash', () => {
    expect(canonicalUrl('/es/projects', SITE)).toBe('https://example.dev/es/projects/');
  });

  it('lists every language plus x-default from either language', () => {
    const expected = [
      { hreflang: 'en', href: 'https://example.dev/projects/' },
      { hreflang: 'es', href: 'https://example.dev/es/projects/' },
      { hreflang: 'x-default', href: 'https://example.dev/projects/' },
    ];
    expect(alternateLinks('/projects/', SITE)).toEqual(expected);
    expect(alternateLinks('/es/projects/', SITE)).toEqual(expected);
  });

  it('knows which codes are locales', () => {
    expect(isLocale('es')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(defaultLocale).toBe('en');
  });
});

describe('formatDate', () => {
  it('formats in the language of the page', () => {
    expect(formatDate('2026-11-03', 'en')).toBe('November 3, 2026');
    expect(formatDate('2026-11-03', 'es')).toBe('3 de noviembre de 2026');
  });

  it('keeps the calendar day regardless of the time zone', () => {
    expect(formatDate('2026-01-01', 'en')).toBe('January 1, 2026');
    expect(formatDate('2026-12-31', 'en')).toBe('December 31, 2026');
  });
});

describe('dictionaries', () => {
  it('has the same keys in English and Spanish', () => {
    expect(leaves(es).map(([key]) => key)).toEqual(leaves(en).map(([key]) => key));
  });

  it('has no empty strings', () => {
    for (const dictionary of [en, es]) {
      expect(leaves(dictionary).filter(([, value]) => value.trim() === '')).toEqual([]);
    }
  });

  it('does not leave English text in the Spanish dictionary', () => {
    // Names, brands, years and the "CV (PDF)" label are the same in both languages on purpose.
    const sameInBoth = [
      /^site\.(firstNames|lastNames|shortName)$/,
      /^contact\.(linkedin|github|cv)$/,
      /^about\.education\.(years|school)$/,
      /^about\.experience\.1\.name$/,
      /^about\.certifications\.\d+\.(name|issuer|year)$/,
      /^expertise\.primary\.\d+\.name$/,
      // The language a phrase is written in is a fact about the phrase, not copy to translate.
      /Lang$/,
    ];
    const spanish = new Map(leaves(es));
    const untranslated = leaves(en)
      .filter(
        ([key, value]) =>
          !sameInBoth.some((pattern) => pattern.test(key)) && spanish.get(key) === value,
      )
      .map(([key]) => key);
    expect(untranslated).toEqual([]);
  });

  it('returns the dictionary for a locale', () => {
    expect(getDictionary('en')).toBe(en);
    expect(getDictionary('es')).toBe(es);
  });
});
