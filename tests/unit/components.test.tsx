import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LanguageSwitch } from '../../src/components/navigation/LanguageSwitch';
import { Hero } from '../../src/components/sections/Hero';
import { MarginNote } from '../../src/components/shared/MarginNote';
import { SiteHeader } from '../../src/components/navigation/SiteHeader';
import { ThemeToggle } from '../../src/components/navigation/ThemeToggle';
import { CaseStudySection } from '../../src/components/shared/CaseStudySection';
import { FeatureList } from '../../src/components/shared/FeatureList';
import { ProjectList } from '../../src/components/shared/ProjectList';
import { CaseStudyHeader } from '../../src/components/sections/CaseStudyHeader';
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

describe('CaseStudySection', () => {
  it('renders the prose under a labelled heading and puts the notes after it', () => {
    const { container } = render(
      <CaseStudySection
        id="architecture"
        title="Architecture"
        html="<p>Layers.</p>"
        notes={[evidence]}
        locale="en"
        labels={en.note}
      />,
    );
    const section = screen.getByRole('region', { name: 'Architecture' });
    expect(section).toHaveAttribute('id', 'architecture');
    expect(container.querySelector('.case-prose')).toHaveTextContent('Layers.');
    const html = section.innerHTML;
    expect(html.indexOf('Layers.')).toBeLessThan(html.indexOf('Verified'));
  });

  it('has no notes column when there is no evidence', () => {
    render(
      <CaseStudySection
        id="x"
        title="X"
        html="<p>Text.</p>"
        notes={[]}
        locale="en"
        labels={en.note}
      />,
    );
    expect(screen.queryByText('Verified')).not.toBeInTheDocument();
  });
});

describe('FeatureList', () => {
  it('writes the status of every feature in words', () => {
    render(
      <FeatureList
        labels={en.caseStudy.featureStatus}
        features={[
          { name: 'Login', description: 'Sign in.', status: 'implemented' },
          { name: 'CI', description: 'Pipelines.', status: 'in-progress' },
          { name: 'Export', description: 'CSV.', status: 'planned' },
        ]}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Implemented')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Planned')).toBeInTheDocument();
  });
});

describe('ProjectList', () => {
  const projects = [
    {
      slug: 'one',
      title: 'One',
      summary: 'First.',
      status: 'production',
      stack: ['React'],
      repo: 'https://github.com/x/one',
      demo: 'https://one.dev/',
    },
    {
      slug: 'two',
      title: 'Two',
      summary: 'Second.',
      status: 'in-progress',
      stack: ['TypeScript'],
      repo: 'https://github.com/x/two',
    },
  ] as const;

  it('links each title to its case study in the current language', () => {
    render(
      <ProjectList
        projects={projects}
        locale="es"
        labels={{ caseStudy: es.caseStudy, status: es.status }}
      />,
    );
    expect(screen.getByRole('link', { name: 'One' })).toHaveAttribute('href', '/es/projects/one/');
    expect(screen.getByRole('link', { name: 'Two' })).toHaveAttribute('href', '/es/projects/two/');
  });

  it('offers the repository for each project and the demo only when there is one', () => {
    render(
      <ProjectList
        projects={projects}
        locale="en"
        labels={{ caseStudy: en.caseStudy, status: en.status }}
      />,
    );
    expect(screen.getAllByRole('link', { name: /^Repository/ })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /^Live demo/ })).toHaveLength(1);
  });
});

describe('CaseStudyHeader', () => {
  const props = {
    title: 'Cocktail Lab',
    summary: 'A cocktail app.',
    status: 'production',
    stack: ['React', 'TypeScript'],
    repo: 'https://github.com/x/y',
    sections: [{ id: 'overview', title: 'Overview' }],
    locale: 'en',
    labels: { caseStudy: en.caseStudy, status: en.status, note: en.note },
  } as const;

  it('shows each metric next to the evidence behind it', () => {
    render(
      <CaseStudyHeader
        {...props}
        metrics={[{ label: 'Line coverage', value: '89.42%', evidence }]}
      />,
    );
    expect(screen.getByText('Line coverage: 89.42%')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Cocktail Lab at commit 5296d93' }),
    ).toBeInTheDocument();
  });

  it('offers a breadcrumb that marks the current page and an in-page table of contents', () => {
    render(<CaseStudyHeader {...props} />);
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects/');
    expect(
      screen.getByText('Cocktail Lab', { selector: '[aria-current="page"]' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '#overview');
  });

  it('does not show a demo link when there is none', () => {
    render(<CaseStudyHeader {...props} />);
    expect(screen.queryByRole('link', { name: 'Live demo' })).not.toBeInTheDocument();
  });
});
