"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ViewportRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "rise" | "soft" | "fade";
}

function joinClasses(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function ViewportReveal({
  children,
  className,
  variant = "rise",
}: ViewportRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "-10% 0px -12% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const variantClass =
    variant === "soft"
      ? isVisible
        ? "translate-y-0 scale-100 opacity-100"
        : "translate-y-2 scale-[0.995] opacity-0"
      : variant === "fade"
        ? isVisible
          ? "opacity-100"
          : "opacity-0"
        : isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0";

  return (
    <div
      ref={ref}
      className={joinClasses(
        "transition-all duration-[var(--motion-slow)] ease-[var(--ease-enter)]",
        variantClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
