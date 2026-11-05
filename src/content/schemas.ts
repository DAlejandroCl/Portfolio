import { z } from 'astro/zod';
import { locales } from '../i18n/config';

const httpsUrl = z.url({ protocol: /^https$/ });

/** Accepts `'2026-11-03'` and the Date object that YAML produces for an unquoted date. */
const isoDate = z.union([
  z.iso.date(),
  z.date().transform((value) => value.toISOString().slice(0, 10)),
]);

export const evidenceStatuses = ['verified', 'target', 'stated'] as const;

/**
 * Where a claim comes from. `verified` means it was measured or checked
 * against a source on `verifiedOn`; `target` is a goal, not a result;
 * `stated` comes from the owner's CV and has not been independently checked.
 */
export const evidenceSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens'),
  claim: z.string().min(1),
  source: z.object({ label: z.string().min(1), url: httpsUrl }),
  verifiedOn: isoDate,
  status: z.enum(evidenceStatuses),
});

/** A figure shown on the site. It is only valid when it points at an evidence item. */
export const metricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  evidenceId: z.string().min(1),
});

export const projectBaseSchema = z.object({
  lang: z.enum(locales),
  title: z.string().min(1),
  summary: z.string().min(1).max(280),
  status: z.enum(['production', 'in-progress']),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative(),
  stack: z.array(z.string().min(1)).min(1),
  links: z.object({ repo: httpsUrl, demo: httpsUrl.optional() }),
  screenshotAlt: z.string().min(1),
  evidence: z.array(evidenceSchema).default([]),
  metrics: z.array(metricSchema).default([]),
});

export type Evidence = z.infer<typeof evidenceSchema>;
export type Metric = z.infer<typeof metricSchema>;

interface WithEvidence {
  metrics: Metric[];
  evidence: Evidence[];
}

/**
 * The build rule behind the margin notes: a metric cannot be published unless
 * an evidence item with a source and a date backs it. Used as a refinement so
 * Astro fails the build and Vitest can exercise the same code.
 */
export function checkEvidenceReferences(
  data: WithEvidence,
  ctx: z.core.$RefinementCtx<WithEvidence>,
): void {
  const ids = new Set<string>();
  data.evidence.forEach((item, index) => {
    if (ids.has(item.id)) {
      ctx.addIssue({
        code: 'custom',
        path: ['evidence', index, 'id'],
        message: `Duplicate evidence id "${item.id}".`,
      });
    }
    ids.add(item.id);
  });

  data.metrics.forEach((metric, index) => {
    if (!ids.has(metric.evidenceId)) {
      ctx.addIssue({
        code: 'custom',
        path: ['metrics', index, 'evidenceId'],
        message: `Metric "${metric.label}" points at unknown evidence "${metric.evidenceId}". Every published metric needs an evidence item with a source and a date.`,
      });
    }
  });
}

/** Schema without the image field, so it can be tested outside Astro. */
export const projectSchema = projectBaseSchema.superRefine(checkEvidenceReferences);
