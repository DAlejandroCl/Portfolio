import { describe, expect, it } from 'vitest';
import {
  personJsonLd,
  scholarlyArticleJsonLd,
  serializeJsonLd,
} from '../../src/seo/structuredData';

const site = new URL('https://example.com');

describe('personJsonLd', () => {
  it('describes the person with the language of the page', () => {
    const en = personJsonLd('en', site);
    const es = personJsonLd('es', site);
    expect(en).toMatchObject({
      '@type': 'Person',
      name: 'Diego Alejandro Clavijo Ladino',
      url: 'https://example.com/',
    });
    expect(es).toMatchObject({ url: 'https://example.com/es/' });
  });

  it('never exposes the email or the phone number', () => {
    const text = JSON.stringify(personJsonLd('en', site));
    expect(text).not.toMatch(/mailto|@gmail|phone|telephone|email/i);
  });
});

describe('scholarlyArticleJsonLd', () => {
  const article = scholarlyArticleJsonLd(
    {
      title: 'A paper',
      titleLang: 'en',
      venue: 'IEEE',
      year: 2025,
      url: 'https://ieeexplore.ieee.org/document/1',
    },
    site,
  );

  it('links the person as a contributor, not as the sole author', () => {
    expect(article).toMatchObject({ contributor: { '@id': 'https://example.com/#person' } });
    expect(article).not.toHaveProperty('author');
  });

  it('only claims the year it knows', () => {
    expect(article).toMatchObject({ datePublished: '2025', inLanguage: 'en' });
  });
});

describe('serializeJsonLd', () => {
  it('cannot be closed early by a script tag in the data', () => {
    expect(serializeJsonLd({ a: '</script><b>' })).not.toContain('</script>');
  });
});
