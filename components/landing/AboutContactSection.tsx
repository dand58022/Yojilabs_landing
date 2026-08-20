import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { siteContent } from "@/content/site-content";

export function AboutContactSection() {
  const { aboutContact } = siteContent.home;

  return (
    <section
      id="about-contact"
      className="container-shell border-t border-border/70 py-16 lg:py-20"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="space-y-6">
          <SectionEyebrow>{aboutContact.eyebrow}</SectionEyebrow>
          <h2 className="max-w-[13ch] text-4xl sm:text-5xl">
            {aboutContact.title}
          </h2>
          <p className="prose-measure text-base leading-8 text-text-muted sm:text-lg">
            {aboutContact.description}
          </p>
        </div>

        <div className="space-y-8">
          <ProcessSteps steps={aboutContact.process} />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div className="card-surface px-6 py-7 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                Contact
              </p>
              <a
                href={`mailto:${aboutContact.contact.email}`}
                className="mt-4 block text-xl font-semibold text-text-strong transition hover:text-accent"
              >
                {aboutContact.contact.email}
              </a>
              <p className="mt-4 text-sm leading-7 text-text-muted">
                {aboutContact.contact.formDescription}
              </p>
              <div className="mt-6 rounded-[var(--radius-card)] border border-border/80 bg-surface-soft px-4 py-4 text-sm leading-7 text-text-muted">
                {aboutContact.responseNote}
              </div>
            </div>

            <div className="card-surface px-6 py-7 sm:px-7">
              <p className="text-sm font-semibold text-text-strong">
                {aboutContact.contact.formTitle}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[var(--radius-control)] border border-border/80 bg-surface-soft px-4 py-3 text-sm text-text-muted">
                  Name
                </div>
                <div className="rounded-[var(--radius-control)] border border-border/80 bg-surface-soft px-4 py-3 text-sm text-text-muted">
                  Email
                </div>
                <div className="rounded-[var(--radius-control)] border border-border/80 bg-surface-soft px-4 py-3 text-sm text-text-muted sm:col-span-2">
                  Subject
                </div>
                <div className="rounded-[var(--radius-control)] border border-dashed border-border/80 bg-surface-soft px-4 py-8 text-sm text-text-muted sm:col-span-2">
                  General contact form interaction lands next. This section is the
                  styled mount point for the mocked localhost form.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
