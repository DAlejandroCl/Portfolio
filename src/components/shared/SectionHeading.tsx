interface SectionHeadingProps {
  id: string;
  children: string;
}

/** The `h2` of a section, with the rule that opens it. */
export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2 id={id} className="mb-10 border-t border-line-strong pt-6 text-h2">
      {children}
    </h2>
  );
}
