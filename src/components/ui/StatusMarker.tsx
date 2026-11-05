export type ProjectStatus = 'production' | 'completed' | 'in-progress';
export type FeatureStatus = 'implemented' | 'in-progress' | 'planned';

interface StatusMarkerProps {
  status: ProjectStatus | FeatureStatus;
  label: string;
}

/**
 * A shape plus its name. The shape is decoration (hidden from assistive
 * technology); the word always carries the meaning.
 */
export function StatusMarker({ status, label }: StatusMarkerProps) {
  return (
    <span className="inline-flex items-center gap-2 font-display text-note font-semibold">
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <rect
          x="1"
          y="1"
          width="10"
          height="10"
          fill={status === 'in-progress' || status === 'planned' ? 'none' : 'currentColor'}
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {status === 'in-progress' && <rect x="1" y="1" width="5" height="10" fill="currentColor" />}
      </svg>
      {label}
    </span>
  );
}
