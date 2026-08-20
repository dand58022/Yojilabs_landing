import type { ReactNode } from "react";
import { SystemLineAccent } from "@/components/brand/SystemLineAccent";

interface SectionEyebrowProps {
  children: ReactNode;
}

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
      <SystemLineAccent className="h-3 w-[4.15rem] shrink-0 opacity-70" />
      <span>{children}</span>
    </p>
  );
}
