"use client";

import { useState } from "react";
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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {demos.map((demo) => {
          const isActive = demo.id === activeDemo.id;

          return (
            <button
              key={demo.id}
              type="button"
              className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-surface text-text-muted hover:border-accent/35 hover:text-accent"
              }`}
              onClick={() => setActiveDemoId(demo.id)}
            >
              {demo.heroTabLabel}
            </button>
          );
        })}
      </div>

      <p className="max-w-xl text-sm leading-7 text-text-muted">
        {activeDemo.heroCaption}
      </p>

      <ProductPreview demo={activeDemo} />
    </div>
  );
}
