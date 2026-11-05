import { Marked } from 'marked';

/** A section of a case study, ready to render. */
export interface CaseSection {
  id: string;
  title: string;
  html: string;
  /** Evidence items that sit in the margin beside this section. */
  evidenceIds: string[];
  /** The section shows the project's feature list where the marker was. */
  hasFeatures: boolean;
}

export const requiredSections = {
  full: [
    'overview',
    'problem',
    'features',
    'stack',
    'architecture',
    'decisions',
    'challenges',
    'testing',
    'accessibility-performance',
    'lessons',
    'links',
  ],
  short: ['overview', 'stack', 'demonstrates', 'decision', 'limitations', 'links'],
} as const;

const HEADING = /^## (.+?) \{#([a-z0-9]+(?:-[a-z0-9]+)*)\}\s*$/;
const EVIDENCE = /<!--\s*evidence:\s*([a-z0-9,\s-]+?)\s*-->/g;
const FEATURES = /<!--\s*features\s*-->/;

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const markdown = new Marked({
  gfm: true,
  renderer: {
    // External links always open safely.
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const attrs = [
        `href="${escapeHtml(href)}"`,
        title ? `title="${escapeHtml(title)}"` : '',
        external ? 'rel="noopener noreferrer"' : '',
      ].filter(Boolean);
      return `<a ${attrs.join(' ')}>${text}</a>`;
    },
  },
});

/**
 * Splits a case study body into sections. Each section starts with
 * `## Title {#id}`. Inside a section, `<!-- evidence: a, b -->` places those
 * evidence items in the margin, and `<!-- features -->` marks where the
 * feature list goes.
 */
export function parseSections(body: string): CaseSection[] {
  const sections: { id: string; title: string; lines: string[] }[] = [];

  for (const line of body.split(/\r?\n/)) {
    const heading = HEADING.exec(line);
    if (heading?.[1] !== undefined && heading[2] !== undefined) {
      sections.push({ id: heading[2], title: heading[1], lines: [] });
    } else if (line.startsWith('## ')) {
      throw new Error(`Section heading without an id: "${line}". Use "## Title {#id}".`);
    } else {
      const current = sections.at(-1);
      if (current) {
        current.lines.push(line);
      } else if (line.trim() !== '') {
        throw new Error('Text before the first section heading.');
      }
    }
  }

  return sections.map(({ id, title, lines }) => {
    const source = lines.join('\n');
    const evidenceIds = [...source.matchAll(EVIDENCE)].flatMap((match) =>
      (match[1] ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    );
    const hasFeatures = FEATURES.test(source);
    const clean = source.replace(EVIDENCE, '').replace(FEATURES, '');
    return { id, title, html: markdown.parse(clean, { async: false }), evidenceIds, hasFeatures };
  });
}

interface CaseStudyInput {
  kind: keyof typeof requiredSections;
  evidence: readonly { id: string }[];
  features: readonly unknown[];
}

/** Everything wrong with a case study body. An empty list means it is publishable. */
export function checkCaseStudy(data: CaseStudyInput, sections: readonly CaseSection[]): string[] {
  const problems: string[] = [];
  const ids = sections.map((section) => section.id);

  for (const id of new Set(ids.filter((id, index) => ids.indexOf(id) !== index))) {
    problems.push(`Duplicate section id "${id}".`);
  }
  for (const required of requiredSections[data.kind]) {
    if (!ids.includes(required)) {
      problems.push(`Missing section "${required}" (a ${data.kind} case study needs it).`);
    }
  }
  const known = new Set(data.evidence.map((item) => item.id));
  for (const section of sections) {
    for (const evidenceId of section.evidenceIds) {
      if (!known.has(evidenceId)) {
        problems.push(`Section "${section.id}" cites unknown evidence "${evidenceId}".`);
      }
    }
    if (section.hasFeatures && data.features.length === 0) {
      problems.push(`Section "${section.id}" shows features but the project defines none.`);
    }
  }
  return problems;
}
