import { describe, expect, it } from 'vitest';
import { resolveMetrics } from '../../src/content/evidence';
import type { Evidence, Metric } from '../../src/content/schemas';

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

const metric: Metric = { label: 'Line coverage', value: '89.42%', evidenceId: 'line-coverage' };

describe('resolveMetrics', () => {
  it('joins each metric with its evidence', () => {
    expect(resolveMetrics({ metrics: [metric], evidence: [evidence] })).toEqual([
      { label: 'Line coverage', value: '89.42%', evidence },
    ]);
  });

  it('returns nothing when there are no metrics', () => {
    expect(resolveMetrics({ metrics: [], evidence: [evidence] })).toEqual([]);
  });

  it('throws instead of rendering a number without a source', () => {
    expect(() => resolveMetrics({ metrics: [metric], evidence: [] })).toThrow(
      'has no evidence "line-coverage"',
    );
  });
});
