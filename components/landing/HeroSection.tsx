import Link from "next/link";
import { HeroDemoTabs } from "@/components/landing/HeroDemoTabs";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { demoContent } from "@/content/demo-content";
import { siteContent } from "@/content/site-content";

export function HeroSection() {
  const { hero } = siteContent.home;
  const demos = hero.demoOrder
    .map((demoId) => demoContent.find((demo) => demo.id === demoId))
    .filter((demo) => demo !== undefined);

  if (demos.length === 0) {
    return null;
  }

  return (
    <section className="hero-shell grid gap-14 pb-20 pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)] lg:items-start lg:gap-18 lg:pb-28 lg:pt-22">
      <div className="space-y-8 lg:sticky lg:top-28">
        <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>

        <div className="space-y-6">
          <h1 className="max-w-[10ch] text-5xl sm:text-6xl lg:text-[5.25rem]">
            {hero.title}
          </h1>
          <p className="prose-measure text-lg leading-8 text-text-muted sm:text-xl">
            {hero.body}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <HeroDemoTabs demos={demos} defaultDemoId={hero.demoOrder[0]} />
    </section>
  );
}
