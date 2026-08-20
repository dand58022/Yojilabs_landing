"use client";

import { useEffect, useState } from "react";

export function HeroScrollCue() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY < 120);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-1 left-1/2 hidden -translate-x-1/2 transition-opacity duration-[var(--motion-standard)] ease-[var(--ease-standard)] lg:flex ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
        <span>Explore</span>
        <span className="scroll-cue-arrow text-accent">↓</span>
      </div>
    </div>
  );
}
