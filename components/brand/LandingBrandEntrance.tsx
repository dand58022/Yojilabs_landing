"use client";

import { useEffect, useState } from "react";
import { YojiLabsLoaderOverlay } from "@/components/brand/YojiLabsLoaderOverlay";

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

  return <YojiLabsLoaderOverlay visible={isVisible} size="md" variant="full" />;
}
