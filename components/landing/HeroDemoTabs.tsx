"use client";

import { startTransition, useState } from "react";
import { ProductPreview } from "@/components/landing/ProductPreview";
import type { DemoExperience, DemoId } from "@/types/site";

interface HeroDemoTabsProps {
  demos: readonly DemoExperience[];
  defaultDemoId: DemoId;
}

export function HeroDemoTabs({ demos, defaultDemoId }: HeroDemoTabsProps) {
  const [activeDemoId, setActiveDemoId] = useState(defaultDemoId);
  const activeDemo =
    demos.find((demo) => demo.id === activeDemoId) ?? demos[0];

  return (
    <div className="space-y-4 lg:space-y-5">
      <div className="rounded-[calc(var(--radius-panel)+0.125rem)] border border-border/80 bg-surface/75 p-3 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap gap-2.5">
          {demos.map((demo) => {
            const isActive = demo.id === activeDemo.id;

            return (
              <button
                key={demo.id}
                type="button"
                className={`group relative overflow-hidden rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-text-muted hover:border-accent/35 hover:text-accent"
                }`}
                onClick={() =>
                  startTransition(() => {
                    setActiveDemoId(demo.id);
                  })
                }
              >
                <span className="relative z-10">{demo.heroTabLabel}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 bottom-1 h-px origin-left transition-transform duration-[var(--motion-standard)] ease-[var(--ease-enter)] ${
                    isActive
                      ? "scale-x-100 bg-white/80"
                      : "scale-x-0 bg-accent/45 group-hover:scale-x-100"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="max-w-xl text-sm leading-7 text-text-muted">
        {activeDemo.heroCaption}
      </p>

      <div key={activeDemo.id} className="preview-enter">
        <ProductPreview demo={activeDemo} />
      </div>
    </div>
  );
}
