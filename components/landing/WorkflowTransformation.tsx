"use client";

import { useEffect, useRef, useState } from "react";

function WorkflowNode({
  children,
  active = false,
}: {
  children: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border px-4 py-3 text-sm font-medium transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
        active
          ? "border-accent/35 bg-[#FFF6EA] text-text-strong shadow-[0_12px_28px_rgba(48,24,10,0.06)]"
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
        threshold: 0.32,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="card-surface overflow-hidden px-5 py-6 sm:px-6 lg:px-7">
      <div className="flex flex-col gap-3 border-b border-border/65 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Workflow shift
          </p>
          <h3 className="max-w-[18ch] text-3xl sm:text-[2.2rem]">
            From disconnected tools to one connected workflow.
          </h3>
        </div>
        <p className="max-w-[34rem] text-sm leading-7 text-text-muted">
          YojiLabs replaces repetitive handoffs, spreadsheets, and disconnected tools with
          software designed around the way your team actually works.
        </p>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,0.84fr)_minmax(0,0.9fr)_minmax(0,1fr)] xl:items-center">
        <div
          className={`space-y-3 transition-all duration-[var(--motion-slow)] ease-[var(--ease-enter)] ${
            isActive ? "opacity-55 xl:-translate-x-1.5" : "opacity-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-surface-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              Before
            </span>
            <span className="text-xs text-text-muted">Manual handoffs and scattered tools</span>
          </div>
          <WorkflowNode>Spreadsheet</WorkflowNode>
          <div className="ml-6 h-4 w-px bg-border/85" />
          <WorkflowNode>Email</WorkflowNode>
          <div className="ml-6 h-4 w-px bg-border/85" />
          <WorkflowNode>Copy / Paste</WorkflowNode>
          <div className="ml-6 h-4 w-px bg-border/85" />
          <WorkflowNode>Manual Follow-Up</WorkflowNode>
        </div>

        <div className="relative rounded-[var(--radius-panel)] border border-border/75 bg-[linear-gradient(180deg,#FFF8EE_0%,#FCF4E6_100%)] px-5 py-6 shadow-[0_18px_38px_rgba(48,24,10,0.06)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="rounded-full border border-accent/25 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              YojiLabs System
            </span>
            <span className="text-xs text-text-muted">Connected workflow layer</span>
          </div>
          <p className="max-w-[26ch] text-base leading-7 text-text-strong">
            Bring intake, operations, scheduling, reporting, and automations into one system
            shaped around the business instead of the software gaps.
          </p>

          <div className="mt-5 space-y-3">
            {["Shared data model", "Automation touchpoints", "Clear handoff rules"].map(
              (item, index) => (
                <div
                  key={item}
                  className={`rounded-[var(--radius-control)] border border-border/70 bg-surface px-3 py-2.5 text-sm text-text-muted transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  {item}
                </div>
              ),
            )}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-10 xl:block">
            <span
              className={`absolute left-0 top-1/2 h-px bg-accent/70 transition-all duration-[520ms] ease-[var(--ease-enter)] ${
                isActive ? "w-10 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-10 xl:block">
            <span
              className={`absolute right-0 top-[32%] h-px bg-accent/70 transition-all duration-[520ms] ease-[var(--ease-enter)] ${
                isActive ? "w-10 opacity-100" : "w-0 opacity-0"
              }`}
            />
            <span
              className={`absolute right-0 top-[50%] h-px bg-accent/70 transition-all duration-[520ms] ease-[var(--ease-enter)] ${
                isActive ? "w-10 opacity-100" : "w-0 opacity-0"
              }`}
            />
            <span
              className={`absolute right-0 top-[68%] h-px bg-accent/70 transition-all duration-[520ms] ease-[var(--ease-enter)] ${
                isActive ? "w-10 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#FFF6EA] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              After
            </span>
            <span className="text-xs text-text-muted">One system feeding real outputs</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-3">
            {["Inventory", "Scheduling", "Reporting"].map((item, index) => (
              <div
                key={item}
                className={`transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                  isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${140 + index * 70}ms` }}
              >
                <WorkflowNode active>{item}</WorkflowNode>
              </div>
            ))}
          </div>
          <div
            className={`mx-auto w-full max-w-[12rem] transition-all duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <div className="mx-auto h-4 w-px bg-accent/55" />
            <WorkflowNode active>Automation</WorkflowNode>
          </div>
        </div>
      </div>
    </div>
  );
}
