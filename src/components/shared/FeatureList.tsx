import type { Feature } from '../../content/schemas';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { StatusMarker } from '../ui/StatusMarker';

interface FeatureListProps {
  features: readonly Feature[];
  labels: Dictionary['caseStudy']['featureStatus'];
}

/** Every feature carries its status as a shape and as a word. */
export function FeatureList({ features, labels }: FeatureListProps) {
  return (
    <ul className="mt-6 divide-y divide-line border-y border-line">
      {features.map((feature) => (
        <li key={feature.name} className="py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="font-display font-semibold text-ink">{feature.name}</p>
            <StatusMarker status={feature.status} label={labels[feature.status]} />
          </div>
          <p className="mt-1 text-ink-muted">{feature.description}</p>
        </li>
      ))}
    </ul>
  );
}
