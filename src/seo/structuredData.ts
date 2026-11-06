import { profile } from '../data/profile';
import type { Locale } from '../i18n/config';
import { getDictionary } from '../i18n/utils';

export type JsonLd = Record<string, unknown>;

interface PublicationFacts {
  title: string;
  titleLang: Locale;
  venue: string;
  year: number;
  url: string;
}

/**
 * Describes the person using only facts already published on the page.
 * The email and the phone number are left out on purpose: structured data
 * is read by crawlers, and the contact policy is "mailto link only".
 */
export function personJsonLd(locale: Locale, site: URL): JsonLd {
  const t = getDictionary(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': new URL('/#person', site).href,
    name: `${t.site.firstNames} ${t.site.lastNames}`,
    jobTitle: t.site.role,
    url: new URL(locale === 'en' ? '/' : `/${locale}/`, site).href,
    sameAs: [profile.links.github, profile.links.linkedin],
    alumniOf: { '@type': 'CollegeOrUniversity', name: t.about.education.school },
    knowsLanguage: ['es', 'en'],
    knowsAbout: [...profile.primarySkills],
  };
}

/**
 * The paper is research the person co-authored, so it is linked with
 * `contributor` rather than `author`, which would imply sole authorship.
 * Only the year is known, so that is all `datePublished` carries.
 */
export function scholarlyArticleJsonLd(publication: PublicationFacts, site: URL): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    inLanguage: publication.titleLang,
    datePublished: String(publication.year),
    publisher: { '@type': 'Organization', name: publication.venue },
    url: publication.url,
    contributor: { '@id': new URL('/#person', site).href },
  };
}

/** Serializes for a `<script type="application/ld+json">` without allowing `</script>` to end it early. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
