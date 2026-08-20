import Link from "next/link";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { demoContent } from "@/content/demo-content";
import { siteContent } from "@/content/site-content";
import type { DemoExperience } from "@/types/site";

function resolveDemoLink(demo: DemoExperience) {
  return demo.destination.link?.href ?? null;
}

export function DemosPreviewSection() {
  const { demosPreview } = siteContent.home;
  const { demosRoute } = siteContent;
  const demos = demosPreview.demoOrder
    .map((demoId) => demoContent.find((demo) => demo.id === demoId))
    .filter((demo) => demo !== undefined);

  return (
    <section className="container-shell border-t border-border/70 py-16 lg:py-20">
      <div className="space-y-12">
        <div className="space-y-5">
          <SectionEyebrow>{demosPreview.eyebrow}</SectionEyebrow>
          <h2 className="max-w-[14ch] text-4xl sm:text-5xl">{demosPreview.title}</h2>
          <p className="prose-measure text-base leading-8 text-text-muted sm:text-lg">
            {demosPreview.intro}
          </p>
          <p className="text-sm font-medium text-text-muted">
            {demosRoute.preparationNote}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {demos.map((demo) => {
            const demoLink = resolveDemoLink(demo);

            return (
              <article key={demo.id} className="card-surface h-full px-6 py-7 sm:px-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    {demo.category}
                  </p>
                  <span className="rounded-full border border-border/80 bg-surface-soft px-3 py-1 text-xs font-medium text-text-muted">
                    {demo.destination.availabilityLabel}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-2xl">{demo.previewCard.title}</h3>
                  <p className="text-base leading-8 text-text-muted">
                    {demo.previewCard.useCase}
                  </p>
                </div>

                <div className="mt-6 rounded-[var(--radius-card)] border border-border/80 bg-surface-soft px-4 py-4">
                  <p className="text-sm font-semibold text-text-strong">Outcome</p>
                  <p className="mt-2 text-sm leading-7 text-text-muted">
                    {demo.previewCard.outcome}
                  </p>
                </div>

                <div className="mt-6">
                  {demoLink ? (
                    <Link
                      href={demoLink}
                      className="inline-flex items-center text-sm font-semibold text-accent transition hover:text-accent/80"
                    >
                      Explore this direction
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold text-text-muted">
                      Full route and demo handoff land in the next steps.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div>
          <Link
            href={demosPreview.cta.href}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
          >
            {demosPreview.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
