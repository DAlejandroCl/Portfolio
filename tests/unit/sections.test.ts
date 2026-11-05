import { describe, expect, it } from 'vitest';
import { checkCaseStudy, parseSections, requiredSections } from '../../src/content/sections';

const body = `
## Overview {#overview}

First paragraph with a [link](https://example.dev) and \`code\`.

## Architecture {#architecture}

<!-- evidence: zod-types, lazy-routes -->

Text with **emphasis**.

## Features {#features}

<!-- features -->
`;

describe('parseSections', () => {
  const sections = parseSections(body);

  it('splits the body at each heading and reads the explicit id', () => {
    expect(sections.map((section) => [section.id, section.title])).toEqual([
      ['overview', 'Overview'],
      ['architecture', 'Architecture'],
      ['features', 'Features'],
    ]);
  });

  it('renders Markdown and opens external links safely', () => {
    const html = sections[0]?.html ?? '';
    expect(html).toContain('<code>code</code>');
    expect(html).toContain('href="https://example.dev"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('takes evidence ids out of the prose and keeps them for the margin', () => {
    expect(sections[1]?.evidenceIds).toEqual(['zod-types', 'lazy-routes']);
    expect(sections[1]?.html).not.toContain('evidence');
    expect(sections[1]?.html).toContain('<strong>emphasis</strong>');
  });

  it('marks where the feature list goes', () => {
    expect(sections[2]?.hasFeatures).toBe(true);
    expect(sections[0]?.hasFeatures).toBe(false);
  });

  it('rejects a heading without an explicit id', () => {
    expect(() => parseSections('## No id here\n\ntext')).toThrow('without an id');
  });

  it('rejects text before the first heading', () => {
    expect(() => parseSections('Loose text\n\n## A {#a}\n')).toThrow('before the first section');
  });
});

describe('checkCaseStudy', () => {
  const complete = (kind: 'full' | 'short') =>
    requiredSections[kind].map((id) => `## ${id} {#${id}}\n\ntext\n`).join('\n');

  it('accepts a body with every required section', () => {
    for (const kind of ['full', 'short'] as const) {
      const problems = checkCaseStudy(
        { kind, evidence: [], features: [] },
        parseSections(complete(kind)),
      );
      expect(problems).toEqual([]);
    }
  });

  it('reports a missing section', () => {
    const sections = parseSections(
      complete('short').replace('## limitations {#limitations}', '## x {#x}'),
    );
    expect(checkCaseStudy({ kind: 'short', evidence: [], features: [] }, sections)).toEqual([
      'Missing section "limitations" (a short case study needs it).',
    ]);
  });

  it('reports duplicate section ids', () => {
    const sections = parseSections(`${complete('short')}\n## again {#overview}\n`);
    expect(checkCaseStudy({ kind: 'short', evidence: [], features: [] }, sections)).toEqual([
      'Duplicate section id "overview".',
    ]);
  });

  it('fails when a section cites evidence that does not exist', () => {
    const sections = parseSections(
      complete('short').replace(
        '## stack {#stack}\n',
        '## stack {#stack}\n<!-- evidence: ghost -->\n',
      ),
    );
    expect(checkCaseStudy({ kind: 'short', evidence: [], features: [] }, sections)).toEqual([
      'Section "stack" cites unknown evidence "ghost".',
    ]);
  });

  it('fails when the feature list is requested but the project has no features', () => {
    const sections = parseSections(
      complete('short').replace('## stack {#stack}\n', '## stack {#stack}\n<!-- features -->\n'),
    );
    expect(checkCaseStudy({ kind: 'short', evidence: [], features: [] }, sections)).toEqual([
      'Section "stack" shows features but the project defines none.',
    ]);
  });
});
