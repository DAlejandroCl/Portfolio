import { describe, expect, it } from 'vitest';
import { evidenceSchema, projectSchema } from '../../src/content/schemas';

function validEvidence() {
  return {
    id: 'line-coverage',
    claim: 'Line coverage over src/ reported by Vitest.',
    source: {
      label: 'Cocktail Lab at commit 5296d93',
      url: 'https://github.com/DAlejandroCl/Cocktail-Lab',
    },
    verifiedOn: '2026-11-03',
    status: 'verified',
  };
}

function validProject() {
  return {
    lang: 'en',
    title: 'Cocktail Lab',
    summary: 'A cocktail recipe app.',
    status: 'production',
    order: 1,
    stack: ['React', 'TypeScript'],
    links: { repo: 'https://github.com/DAlejandroCl/Cocktail-Lab' },
    screenshotAlt: 'Home page of the app.',
    metrics: [{ label: 'Line coverage', value: '89.42%', evidenceId: 'line-coverage' }],
    evidence: [validEvidence()],
  };
}

function issueMessages(input: unknown): string[] {
  const result = projectSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.message);
}

describe('projectSchema', () => {
  it('accepts a complete project and applies defaults', () => {
    const result = projectSchema.parse(validProject());
    expect(result.featured).toBe(false);
  });

  it('rejects a metric that has no evidence item', () => {
    const project = { ...validProject(), evidence: [] };
    const messages = issueMessages(project);
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain('unknown evidence "line-coverage"');
    expect(messages[0]).toContain('Line coverage');
  });

  it('rejects a metric that points at a different evidence id', () => {
    const project = {
      ...validProject(),
      metrics: [{ label: 'Tests', value: '1,003', evidenceId: 'test-count' }],
    };
    expect(issueMessages(project)[0]).toContain('"test-count"');
  });

  it('reports the path of the offending metric', () => {
    const result = projectSchema.safeParse({ ...validProject(), evidence: [] });
    expect(result.success ? [] : result.error.issues.map((issue) => issue.path)).toEqual([
      ['metrics', 0, 'evidenceId'],
    ]);
  });

  it('rejects duplicate evidence ids', () => {
    const project = { ...validProject(), evidence: [validEvidence(), validEvidence()] };
    expect(issueMessages(project)).toEqual(['Duplicate evidence id "line-coverage".']);
  });

  it('allows evidence that no metric uses', () => {
    const project = { ...validProject(), metrics: [] };
    expect(projectSchema.safeParse(project).success).toBe(true);
  });

  it('rejects an unknown language and an unknown status', () => {
    expect(projectSchema.safeParse({ ...validProject(), lang: 'fr' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...validProject(), status: 'launched' }).success).toBe(false);
  });

  it('rejects repository and demo links that are not https', () => {
    const insecure = { ...validProject(), links: { repo: 'http://github.com/x/y' } };
    expect(projectSchema.safeParse(insecure).success).toBe(false);
    const badDemo = {
      ...validProject(),
      links: { repo: 'https://github.com/x/y', demo: 'not a url' },
    };
    expect(projectSchema.safeParse(badDemo).success).toBe(false);
  });

  it('requires alternative text for the screenshot', () => {
    expect(projectSchema.safeParse({ ...validProject(), screenshotAlt: '' }).success).toBe(false);
  });

  it('requires at least one technology', () => {
    expect(projectSchema.safeParse({ ...validProject(), stack: [] }).success).toBe(false);
  });
});

describe('evidenceSchema', () => {
  it('requires a source with an https URL', () => {
    const noSource = { ...validEvidence(), source: { label: 'CV' } };
    expect(evidenceSchema.safeParse(noSource).success).toBe(false);
    const http = { ...validEvidence(), source: { label: 'CV', url: 'http://example.dev' } };
    expect(evidenceSchema.safeParse(http).success).toBe(false);
  });

  it('requires a real calendar date', () => {
    expect(evidenceSchema.safeParse({ ...validEvidence(), verifiedOn: '2026-13-40' }).success).toBe(
      false,
    );
    expect(evidenceSchema.safeParse({ ...validEvidence(), verifiedOn: 'yesterday' }).success).toBe(
      false,
    );
    const withoutDate: Record<string, unknown> = { ...validEvidence() };
    delete withoutDate['verifiedOn'];
    expect(evidenceSchema.safeParse(withoutDate).success).toBe(false);
  });

  it('turns the Date object that YAML produces into an ISO string', () => {
    const parsed = evidenceSchema.parse({ ...validEvidence(), verifiedOn: new Date('2026-11-03') });
    expect(parsed.verifiedOn).toBe('2026-11-03');
  });

  it('only accepts the three evidence statuses', () => {
    expect(evidenceSchema.safeParse({ ...validEvidence(), status: 'target' }).success).toBe(true);
    expect(evidenceSchema.safeParse({ ...validEvidence(), status: 'stated' }).success).toBe(true);
    expect(evidenceSchema.safeParse({ ...validEvidence(), status: 'proven' }).success).toBe(false);
  });

  it('requires a lowercase hyphenated id', () => {
    expect(evidenceSchema.safeParse({ ...validEvidence(), id: 'Line Coverage' }).success).toBe(
      false,
    );
  });
});
