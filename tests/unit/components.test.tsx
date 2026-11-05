import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LanguageSwitch } from '../../src/components/navigation/LanguageSwitch';
import { Hero } from '../../src/components/sections/Hero';
import { MarginNote } from '../../src/components/shared/MarginNote';
import { SiteHeader } from '../../src/components/navigation/SiteHeader';
import { ThemeToggle } from '../../src/components/navigation/ThemeToggle';
import { ProjectRow } from '../../src/components/shared/ProjectRow';
import { StackList } from '../../src/components/shared/StackList';
import { Button } from '../../src/components/ui/Button';
import { SkipLink } from '../../src/components/ui/SkipLink';
import { StatusMarker } from '../../src/components/ui/StatusMarker';
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

describe('MarginNote for stated facts', () => {
  it('says the author provided the date instead of claiming it was checked', () => {
    render(
      <MarginNote evidence={{ ...evidence, status: 'stated' }} locale="en" labels={en.note} />,
    );
    expect(screen.getByText(/Provided by the author on/)).toBeInTheDocument();
    expect(screen.queryByText(/Checked on/)).not.toBeInTheDocument();
  });
});

describe('StatusMarker', () => {
  it.each([
    ['production', 'Production'],
    ['completed', 'Completed'],
    ['in-progress', 'In active development'],
  ] as const)('always writes the %s status as a word', (status, label) => {
    const { container } = render(<StatusMarker status={status} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('draws a half-filled square only for work in progress', () => {
    const progress = render(<StatusMarker status="in-progress" label="x" />);
    expect(progress.container.querySelectorAll('rect')).toHaveLength(2);
    const done = render(<StatusMarker status="completed" label="x" />);
    expect(done.container.querySelectorAll('rect')).toHaveLength(1);
  });
});

describe('StackList', () => {
  it('separates items with commas and emphasizes only the chosen ones', () => {
    const { container } = render(
      <StackList items={['React', 'TypeScript', 'Vite']} emphasized={['React', 'TypeScript']} />,
    );
    expect(container).toHaveTextContent('React, TypeScript, Vite');
    expect(container.querySelectorAll('.font-semibold')).toHaveLength(2);
  });
});

describe('ProjectRow', () => {
  const props = {
    title: 'Cocktail Lab',
    summary: 'A recipe app.',
    status: 'production',
    statusLabel: 'Production',
    stack: ['React', 'TypeScript'],
    emphasizedStack: ['React', 'TypeScript'],
    href: 'https://github.com/DAlejandroCl/Cocktail-Lab',
    destinationLabel: 'Repository',
    size: 'featured',
  } as const;

  it('makes the title the one link of the row and names its destination', () => {
    render(<ProjectRow {...props} />);
    const link = screen.getByRole('link', { name: 'Cocktail Lab — Repository' });
    expect(link).toHaveAttribute('href', props.href);
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('renders extra links, such as a live demo, with the project name', () => {
    render(<ProjectRow {...props} extraLinks={[{ label: 'Live demo', href: 'https://x.dev/' }]} />);
    expect(screen.getByRole('link', { name: 'Live demo — Cocktail Lab' })).toHaveAttribute(
      'href',
      'https://x.dev/',
    );
  });
});

describe('Button', () => {
  it('is a link, so it works without JavaScript', () => {
    render(<Button href="#projects">View projects</Button>);
    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute(
      'href',
      '#projects',
    );
  });
});

describe('ThemeToggle', () => {
  it('starts hidden and unpressed until the inline script enables it', () => {
    render(<ThemeToggle label="Dark theme" />);
    const button = screen.getByText('Dark theme');
    expect(button).toHaveAttribute('hidden');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('type', 'button');
  });
});

describe('SiteHeader', () => {
  it('links to the sections of the home page of its own language', () => {
    const { container } = render(
      <SiteHeader
        labels={{ site: es.site, nav: es.nav, theme: es.theme }}
        homeHref="/es/"
        otherLocale="en"
        otherLocaleHref="/"
      />,
    );
    const hrefs = [...container.querySelectorAll('nav a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      '/es/#projects',
      '/es/#about',
      '/es/#contact',
      '/es/#projects',
      '/es/#about',
      '/es/#contact',
    ]);
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument();
  });
});
