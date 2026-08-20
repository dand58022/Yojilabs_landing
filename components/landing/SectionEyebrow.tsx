import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
}

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
      <span className="h-px w-10 bg-accent/45" />
      <span>{children}</span>
    </p>
  );
}
