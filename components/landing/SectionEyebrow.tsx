import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
}

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="inline-flex items-center text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-accent">
      <span>{children}</span>
    </p>
  );
}
