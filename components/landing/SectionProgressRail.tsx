"use client";

import { useEffect, useState } from "react";

interface RailSection {
  id: string;
  step: string;
  label: string;
}

const sections: readonly RailSection[] = [
  { id: "home", step: "01", label: "Home" },
  { id: "services", step: "02", label: "What We Build" },
  { id: "demos", step: "03", label: "Demos" },
  { id: "about-contact", step: "04", label: "About" },
];

export function SectionProgressRail() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -42% 0px",
        threshold: [0.12, 0.24, 0.42, 0.58],
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    let animationFrame = 0;

    const updateProgress = () => {
      const first = elements[0];
      const last = elements[elements.length - 1];
      const currentY = window.scrollY + window.innerHeight * 0.42;
      const start = first.offsetTop;
      const end = last.offsetTop + last.offsetHeight;
      const nextProgress = Math.min(
        1,
        Math.max(0, (currentY - start) / Math.max(1, end - start)),
      );
      setProgress(nextProgress);
      animationFrame = 0;
    };

    const onScroll = () => {
      if (animationFrame !== 0) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <nav
      aria-label="Homepage sections"
      className="pointer-events-none fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <div className="pointer-events-auto relative pl-3">
        <span className="absolute left-[0.35rem] top-2 h-[calc(100%-1rem)] w-px bg-border/60" />
        <span
          className="absolute left-[0.35rem] top-2 w-px bg-accent/75 transition-[height] duration-[var(--motion-fast)] ease-[var(--ease-standard)]"
          style={{ height: `calc((100% - 1rem) * ${progress})` }}
        />

        <div className="flex flex-col gap-6">
          {sections.map((section) => {
            const isActive = activeId === section.id;

            return (
              <button
                key={section.id}
                type="button"
                aria-current={isActive ? "location" : undefined}
                className={`group -ml-1 flex items-center gap-3 rounded-full px-1 py-1 text-left transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                  isActive
                    ? "bg-background/92 shadow-[0_10px_30px_rgba(48,24,10,0.08)] backdrop-blur-sm"
                    : "bg-transparent"
                }`}
                onClick={() => scrollToSection(section.id)}
              >
                <span
                  className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                    isActive
                      ? "border-accent bg-accent shadow-[0_0_0_4px_rgba(211,95,57,0.12)]"
                      : "border-border bg-background group-hover:border-accent/60"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-[var(--motion-standard)] ${
                      isActive ? "bg-white" : "bg-border"
                    }`}
                  />
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-flex overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                      isActive
                        ? "max-w-8 opacity-100 text-accent"
                        : "max-w-0 opacity-0 text-text-muted"
                    }`}
                  >
                    {section.step}
                  </span>
                  <span
                    className={`inline-flex overflow-hidden whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                      isActive ? "max-w-32 opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    {section.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
