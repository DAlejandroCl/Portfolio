import type { Evidence, Metric } from './schemas';

export interface ResolvedMetric {
  label: string;
  value: string;
  evidence: Evidence;
}

/**
 * Joins each metric with its evidence. The schema already rejects dangling
 * references at build time; this throws as well so a page can never render a
 * number without its source, even if the schema is loosened by mistake.
 */
export function resolveMetrics(data: {
  metrics: Metric[];
  evidence: Evidence[];
}): ResolvedMetric[] {
  return data.metrics.map((metric) => {
    const evidence = data.evidence.find((item) => item.id === metric.evidenceId);
    if (!evidence) {
      throw new Error(`Metric "${metric.label}" has no evidence "${metric.evidenceId}".`);
    }
    return { label: metric.label, value: metric.value, evidence };
  });
}
