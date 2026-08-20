import { LeafAccent } from "@/components/brand/LeafAccent";
import { SystemBackdrop } from "@/components/brand/SystemBackdrop";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";

export function AboutContactSection() {
  const { aboutContact } = siteContent.home;

  return (
    <section
      id="about"
      className="page-section section-band section-band--warm relative scroll-mt-28 border-t border-border/60"
    >
      <LeafAccent className="pointer-events-none absolute left-6 top-12 hidden w-[7.5rem] text-accent/44 lg:block" />
      <SystemBackdrop className="pointer-events-none absolute left-14 top-44 hidden w-[16rem] text-accent/10 xl:block" />
      <div className="pointer-events-none absolute left-12 top-[11.5rem] hidden h-56 w-48 rounded-[62%_38%_54%_46%/46%_58%_42%_54%] bg-[rgba(248,220,182,0.54)] xl:block" />
      <div className="container-shell py-10 lg:py-[3.75rem]">
        <ViewportReveal
          className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start"
          variant="rise"
        >
          <div className="space-y-5 lg:pl-24">
            <SectionEyebrow>{aboutContact.eyebrow}</SectionEyebrow>
            <h2 className="editorial-headline max-w-[12ch] text-[3rem] sm:text-[3.65rem]">{aboutContact.title}</h2>
            <p className="prose-measure text-base leading-7 text-text-muted sm:text-[1.05rem]">
              {aboutContact.description}
            </p>
          </div>

          <ProcessSteps steps={aboutContact.process} />
        </ViewportReveal>
      </div>
    </section>
  );
}
