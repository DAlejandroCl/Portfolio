interface StackListProps {
  items: readonly string[];
  /** Names set in the heavier weight. Everything else stays regular. */
  emphasized?: readonly string[];
}

/** A plain comma-separated list: no chips, no icons. */
export function StackList({ items, emphasized = [] }: StackListProps) {
  return (
    <p className="text-note text-ink-muted">
      {items.map((item, index) => (
        <span key={item}>
          {emphasized.includes(item) ? (
            <span className="font-semibold text-ink">{item}</span>
          ) : (
            item
          )}
          {index < items.length - 1 ? ', ' : ''}
        </span>
      ))}
    </p>
  );
}
