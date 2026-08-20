import { SystemBackdrop } from "@/components/brand/SystemBackdrop";
import { GeneralContactForm } from "@/components/forms/GeneralContactForm";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { WorkflowTransformation } from "@/components/landing/WorkflowTransformation";
import { siteContent } from "@/content/site-content";

export function AboutContactSection() {
  const { aboutContact } = siteContent.home;

  return (
    <section
      id="about-contact"
      className="section-band section-band--warm relative scroll-mt-28 border-t border-border/60"
    >
      <SystemBackdrop className="absolute left-0 top-14 hidden w-[16rem] -translate-x-1/3 text-accent/10 lg:block" mirrored />
      <div className="container-shell py-14 lg:py-[4.5rem]">
        <ViewportReveal
          className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]"
          variant="rise"
        >
          <div className="space-y-5">
            <SectionEyebrow>{aboutContact.eyebrow}</SectionEyebrow>
            <h2 className="max-w-[13ch] text-4xl sm:text-5xl">
              {aboutContact.title}
            </h2>
            <p className="prose-measure text-base leading-7 text-text-muted sm:text-[1.05rem]">
              {aboutContact.description}
            </p>
          </div>

          <div className="space-y-6">
            <WorkflowTransformation />
            <ProcessSteps steps={aboutContact.process} />

            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
              <div className="card-surface px-5 py-6 sm:px-6">
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

              <GeneralContactForm
                title={aboutContact.contact.formTitle}
                responseNote={aboutContact.responseNote}
              />
            </div>
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
