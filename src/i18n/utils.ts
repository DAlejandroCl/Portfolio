import { defaultLocale, isLocale, locales, type Locale } from './config';
import { en, type Dictionary } from './dictionaries/en';
import { es } from './dictionaries/es';

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Ensures a leading and a trailing slash, matching `trailingSlash: 'always'`. */
export function normalizePath(pathname: string): string {
  const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/** The default locale has no URL prefix, so only other locales are detected. */
export function getLocaleFromPath(pathname: string): Locale {
  const first = normalizePath(pathname).split('/')[1];
  if (first !== undefined && first !== defaultLocale && isLocale(first)) {
    return first;
  }
  return defaultLocale;
}

/** `/es/projects/` becomes `/projects/`. */
export function stripLocale(pathname: string): string {
  const normalized = normalizePath(pathname);
  const locale = getLocaleFromPath(normalized);
  if (locale === defaultLocale) {
    return normalized;
  }
  const rest = normalized.slice(`/${locale}`.length);
  return rest === '' ? '/' : rest;
}

/** Builds the path of a page for a locale, given the locale-free path. */
export function localizedPath(locale: Locale, pathname: string): string {
  const bare = stripLocale(pathname);
  if (locale === defaultLocale) {
    return bare;
  }
  return bare === '/' ? `/${locale}/` : `/${locale}${bare}`;
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

export function canonicalUrl(pathname: string, site: URL | string): string {
  return new URL(normalizePath(pathname), site).href;
}

/** One link per locale plus `x-default`, which points at the default locale. */
export function alternateLinks(pathname: string, site: URL | string): AlternateLink[] {
  const links = locales.map((locale) => ({
    hreflang: locale,
    href: new URL(localizedPath(locale, pathname), site).href,
  }));
  return [
    ...links,
    { hreflang: 'x-default', href: new URL(localizedPath(defaultLocale, pathname), site).href },
  ];
}

/** Formats an ISO date (YYYY-MM-DD) in UTC so the day never shifts with the time zone. */
export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
