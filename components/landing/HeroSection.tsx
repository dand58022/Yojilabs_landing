import Link from "next/link";
import { SystemBackdrop } from "@/components/brand/SystemBackdrop";
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
    <section className="hero-shell relative grid gap-10 overflow-hidden pb-14 pt-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1.12fr)] lg:items-start lg:gap-14 lg:pb-16 lg:pt-14">
      <SystemBackdrop className="absolute -right-12 top-8 hidden w-[18rem] text-accent/12 lg:block" />

      <div className="space-y-7 lg:sticky lg:top-24">
        <div className="hero-reveal [--hero-delay:40ms]">
          <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
        </div>

        <div className="space-y-5 hero-reveal [--hero-delay:100ms]">
          <h1 className="max-w-[9ch] text-5xl sm:text-6xl lg:text-[5.5rem]">
            {hero.title}
          </h1>
          <p className="prose-measure max-w-[34rem] text-lg leading-8 text-text-muted sm:text-[1.17rem]">
            {hero.body}
          </p>
        </div>

        <div className="hero-reveal [--hero-delay:180ms] flex flex-wrap items-center gap-3.5">
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

      <div className="hero-reveal [--hero-delay:240ms]">
        <HeroDemoTabs demos={demos} defaultDemoId={hero.demoOrder[0]} />
      </div>
    </section>
  );
}
