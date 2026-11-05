export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Values for the Open Graph `og:locale` tag. */
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_LA',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
