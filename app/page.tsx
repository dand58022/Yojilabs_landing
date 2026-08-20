import Link from "next/link";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { siteContent } from "@/content/site-content";

export default function Home() {
  const { hero, services, aboutContact } = siteContent.home;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      <main>
        <section className="hero-shell grid gap-14 pb-20 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] lg:items-center lg:gap-18 lg:pb-28 lg:pt-22">
          <div className="space-y-8">
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

          <div className="card-surface p-6 sm:p-7">
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                  Hero Preview Shell
                </p>
                <p className="mt-2 text-xl font-semibold text-text-strong">
                  Multi-product demo surfaces land next
                </p>
              </div>
              <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-text-muted">
                Task 5
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {hero.demoOrder.map((demoId) => (
                <div
                  key={demoId}
                  className="rounded-[var(--radius-card)] border border-border/80 bg-surface-soft px-4 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                    Sample
                  </p>
                  <p className="mt-3 text-sm font-semibold text-text-strong">
                    {demoId.replace(/-/g, " ")}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[var(--radius-card)] border border-dashed border-border/80 bg-[rgba(252,247,238,0.72)] px-5 py-8 text-sm leading-7 text-text-muted">
              The shared content model, typography, and metadata seam are live.
              The fully structured hero demo switcher and product preview renderer
              slot into this frame next.
            </div>
          </div>
        </section>

        <section id="services" className="container-shell border-t border-border/70 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
            <div className="space-y-5">
              <SectionEyebrow>{services.eyebrow}</SectionEyebrow>
              <h2 className="max-w-[14ch] text-4xl sm:text-5xl">
                {services.title}
              </h2>
              <p className="prose-measure text-base leading-8 text-text-muted sm:text-lg">
                {services.intro}
              </p>
            </div>

            <div className="card-surface px-6 py-7 sm:px-8">
              <p className="text-sm font-medium text-text-muted">
                Shared shell ready for the service-card system. The next task will
                replace this placeholder with the four approved service panels,
                icons, and supporting copy.
              </p>
            </div>
          </div>
        </section>

        <section
          id="about-contact"
          className="container-shell border-t border-border/70 py-16 lg:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
            <div className="space-y-5">
              <SectionEyebrow>{aboutContact.eyebrow}</SectionEyebrow>
              <h2 className="max-w-[14ch] text-4xl sm:text-5xl">
                {aboutContact.title}
              </h2>
              <p className="prose-measure text-base leading-8 text-text-muted sm:text-lg">
                {aboutContact.description}
              </p>
            </div>

            <div className="card-surface grid gap-5 px-6 py-7 sm:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-text-muted">
                  Contact seam ready
                </p>
                <p className="mt-3 text-base leading-8 text-text-muted">
                  Email, response expectations, process steps, and the general
                  contact form mount point are all modeled and ready for the full
                  section build.
                </p>
              </div>

              <div className="rounded-[var(--radius-card)] border border-border/80 bg-surface-soft px-4 py-4 text-sm leading-7 text-text-muted">
                {aboutContact.responseNote}
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
