import Link from "next/link";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { demoContent } from "@/content/demo-content";
import { siteContent } from "@/content/site-content";
import type { DemoExperience } from "@/types/site";

function resolveDemoLink(demo: DemoExperience) {
  return demo.destination.link?.href ?? null;
}

export function DemosPlaceholderGrid() {
  const { demosRoute } = siteContent;
  const demos = demosRoute.demoOrder
    .map((demoId) => demoContent.find((demo) => demo.id === demoId))
    .filter((demo) => demo !== undefined);

  return (
    <section className="container-shell py-14 lg:py-18">
      <div className="space-y-10">
        <div className="space-y-5">
          <SectionEyebrow>Demos</SectionEyebrow>
          <h1 className="max-w-[12ch] text-5xl sm:text-6xl">
            {demosRoute.title}
          </h1>
          <p className="prose-measure text-lg leading-8 text-text-muted">
            {demosRoute.description}
          </p>
          <p className="text-sm font-medium text-text-muted">
            {demosRoute.preparationNote}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {demos.map((demo) => {
            const link = resolveDemoLink(demo);

            return (
              <article key={demo.id} className="card-surface h-full px-6 py-7 sm:px-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                    {demo.category}
                  </p>
                  <span className="rounded-full border border-border/80 bg-surface-soft px-3 py-1 text-xs font-medium text-text-muted">
                    {demo.destination.availabilityLabel}
                  </span>
                </div>

                <h2 className="mt-6 text-3xl">{demo.title}</h2>
                <p className="mt-4 text-base leading-8 text-text-muted">
                  {demo.routeCard.summary}
                </p>

                <div className="mt-6 space-y-3">
                  {demo.routeCard.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-[var(--radius-control)] border border-border/70 bg-surface-soft px-4 py-3 text-sm leading-7 text-text-muted"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-7 text-text-muted">
                  {demo.routeCard.availabilityNote}
                </p>

                <div className="mt-6">
                  {link ? (
                    <Link
                      href={link}
                      className="inline-flex items-center text-sm font-semibold text-accent transition hover:text-accent/80"
                    >
                      Continue with this direction
                    </Link>
                  ) : (
                    <span className="text-sm font-semibold text-text-muted">
                      Route connection coming next
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
