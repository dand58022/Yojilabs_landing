"use client";

import { useEffect, useRef, useState } from "react";

function WorkflowPill({
  children,
  active,
}: {
  children: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
        active
          ? "border-accent/45 bg-[#FFF6EA] text-text-strong"
          : "border-border/80 bg-surface text-text-muted"
      }`}
    >
      {children}
    </div>
  );
}

export function WorkflowTransformation() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      const frame = window.requestAnimationFrame(() => {
        setIsActive(true);
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
          setIsActive(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="card-surface overflow-hidden px-5 py-6 sm:px-6 lg:px-7"
    >
      <div className="flex flex-col gap-3 border-b border-border/65 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Workflow shift
          </p>
          <h3 className="max-w-[16ch] text-3xl sm:text-[2.2rem]">
            From manual handoffs to a connected custom system.
          </h3>
        </div>
        <p className="max-w-[34rem] text-sm leading-7 text-text-muted">
          A compact view of the kind of transition YojiLabs helps teams make:
          fewer disconnected tools, more software built around the real workflow.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(5rem,0.2fr)_minmax(0,0.9fr)] lg:items-center">
        <div
          className={`space-y-3 transition-all duration-[var(--motion-slow)] ease-[var(--ease-enter)] ${
            isActive ? "opacity-45 lg:-translate-x-2" : "opacity-100"
          }`}
        >
          <WorkflowPill>Spreadsheet</WorkflowPill>
          <div className="ml-7 h-6 w-px bg-border/90" />
          <WorkflowPill>Email</WorkflowPill>
          <div className="ml-7 h-6 w-px bg-border/90" />
          <WorkflowPill>Copy / Paste</WorkflowPill>
          <div className="ml-7 h-6 w-px bg-border/90" />
          <WorkflowPill>Manual Follow-Up</WorkflowPill>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative flex h-24 w-full items-center justify-center">
            <span
              className={`absolute h-px bg-accent transition-all duration-[var(--motion-slow)] ease-[var(--ease-enter)] ${
                isActive ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            />
            <span
              className={`absolute h-3.5 w-3.5 rounded-full border border-accent bg-background transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                isActive ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {["Inventory", "Scheduling", "Automation", "Reporting"].map(
            (item, index) => (
              <div
                key={item}
                className={`rounded-[var(--radius-card)] border px-4 py-4 text-sm font-medium transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                  isActive
                    ? "border-accent/30 bg-[#FFF7EC] text-text-strong opacity-100 translate-y-0"
                    : "border-border/70 bg-surface text-text-muted opacity-0 translate-y-2"
                }`}
                style={{
                  transitionDelay: isActive ? `${index * 55}ms` : "0ms",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{item}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
