import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LanguageSwitch } from '../../src/components/navigation/LanguageSwitch';
import { Hero } from '../../src/components/sections/Hero';
import { MarginNote } from '../../src/components/shared/MarginNote';
import { SkipLink } from '../../src/components/ui/SkipLink';
import type { Evidence } from '../../src/content/schemas';
import { en } from '../../src/i18n/dictionaries/en';
import { es } from '../../src/i18n/dictionaries/es';

const evidence: Evidence = {
  id: 'line-coverage',
  claim: 'Line coverage over src/.',
  source: {
    label: 'Cocktail Lab at commit 5296d93',
    url: 'https://github.com/DAlejandroCl/Cocktail-Lab',
  },
  verifiedOn: '2026-11-03',
  status: 'verified',
};

describe('MarginNote', () => {
  it('shows the status, the source as a link and the date', () => {
    render(<MarginNote evidence={evidence} locale="en" labels={en.note} />);

    expect(screen.getByText('Verified')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Cocktail Lab at commit 5296d93' });
    expect(link).toHaveAttribute('href', 'https://github.com/DAlejandroCl/Cocktail-Lab');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('November 3, 2026')).toHaveAttribute('datetime', '2026-11-03');
  });

  it('is written in the language of the page', () => {
    render(<MarginNote evidence={evidence} locale="es" labels={es.note} />);

    expect(screen.getByText('Verificado')).toBeInTheDocument();
    expect(screen.getByText(/Fuente:/)).toBeInTheDocument();
    expect(screen.getByText('3 de noviembre de 2026')).toBeInTheDocument();
  });

  it.each([
    ['verified', 'Verified'],
    ['target', 'Target'],
    ['stated', 'Stated'],
  ] as const)('writes out the %s status instead of relying on color', (status, label) => {
    render(<MarginNote evidence={{ ...evidence, status }} locale="en" labels={en.note} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

describe('Hero', () => {
  it('renders the name as the page heading, with a space between both lines', () => {
    render(
      <Hero
        firstNames={en.site.firstNames}
        lastNames={en.site.lastNames}
        jobTitle={en.site.role}
        statement={en.hero.statement}
      />,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Diego Alejandro Clavijo Ladino' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Frontend Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(en.hero.statement)).toBeInTheDocument();
  });

  it('renders the content it receives', () => {
    render(
      <Hero firstNames="A" lastNames="B" jobTitle="Job title" statement="Statement">
        <p>Extra content</p>
      </Hero>,
    );
    expect(screen.getByText('Extra content')).toBeInTheDocument();
  });
});

describe('LanguageSwitch', () => {
  it('links to the other language and declares its language', () => {
    render(<LanguageSwitch href="/es/" label="Español" lang="es" />);

    const link = screen.getByRole('link', { name: 'Español' });
    expect(link).toHaveAttribute('href', '/es/');
    expect(link).toHaveAttribute('hreflang', 'es');
    expect(link).toHaveAttribute('lang', 'es');
  });
});

describe('SkipLink', () => {
  it('points at the main content', () => {
    render(<SkipLink label="Skip to content" />);
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
  });
});
