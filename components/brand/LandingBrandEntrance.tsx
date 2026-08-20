"use client";

import { useEffect, useState } from "react";
import { YojiLabsLoader } from "@/components/brand/YojiLabsLoader";

export function LandingBrandEntrance() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visibleDuration = mediaQuery.matches ? 120 : 920;
    const fadeDuration = mediaQuery.matches ? 0 : 180;

    const fadeTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, visibleDuration);

    const removeTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, visibleDuration + fadeDuration);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 flex items-start justify-center bg-[linear-gradient(180deg,rgba(250,247,241,0.92)_0%,rgba(250,247,241,0.68)_22%,rgba(250,247,241,0)_52%)] pt-24 transition-opacity duration-[var(--motion-standard)] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="rounded-full border border-border/60 bg-surface/88 px-5 py-3 shadow-[var(--shadow-card)] backdrop-blur-sm">
        <YojiLabsLoader size="md" variant="full" />
      </div>
    </div>
  );
}
