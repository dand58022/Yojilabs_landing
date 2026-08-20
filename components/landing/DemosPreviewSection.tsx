import Link from "next/link";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
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
    <section
      id="demos"
      className="page-section section-band section-band--neutral scroll-mt-28 border-t border-border/60"
    >
      <div className="container-shell py-14 lg:py-[4.5rem]">
        <ViewportReveal
          className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start"
          variant="soft"
        >
          <div className="space-y-4">
            <SectionEyebrow>{demosPreview.eyebrow}</SectionEyebrow>
            <h2 className="max-w-[12ch] text-4xl sm:text-5xl">{demosPreview.title}</h2>
            <p className="max-w-[30rem] text-base leading-7 text-text-muted sm:text-[1.05rem]">
              {demosPreview.intro}
            </p>
            <p className="text-sm font-medium text-text-muted">
              {demosRoute.preparationNote}
            </p>

            <div>
              <Link
                href={demosPreview.cta.href}
                className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
              >
                {demosPreview.cta.label}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {demos.map((demo) => {
              const demoLink = resolveDemoLink(demo);

              return (
                <article key={demo.id} className="card-surface h-full px-5 py-6 sm:px-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                      {demo.category}
                    </p>
                    <span className="rounded-full border border-border/80 bg-surface-soft px-3 py-1 text-xs font-medium text-text-muted">
                      {demo.destination.availabilityLabel}
                    </span>
                  </div>

                  <div className="mt-5 rounded-[var(--radius-card)] border border-border/70 bg-[#FFF8EE] px-4 py-4">
                    <div className="flex items-end gap-2">
                      {[42, 64, 51, 76].map((height, index) => (
                        <span
                          key={height}
                          className={`block flex-1 rounded-full ${
                            index === 3 ? "bg-accent" : "bg-surface-soft"
                          }`}
                          style={{ height: `${height}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <h3 className="text-[1.55rem]">{demo.previewCard.title}</h3>
                    <p className="text-[0.98rem] leading-7 text-text-muted">
                      {demo.previewCard.useCase}
                    </p>
                  </div>

                  <div className="mt-5 rounded-[var(--radius-card)] border border-border/80 bg-surface-soft px-4 py-4">
                    <p className="text-sm font-semibold text-text-strong">Outcome</p>
                    <p className="mt-2 text-sm leading-7 text-text-muted">
                      {demo.previewCard.outcome}
                    </p>
                  </div>

                  <div className="mt-5">
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
        </ViewportReveal>
      </div>
    </section>
  );
}
