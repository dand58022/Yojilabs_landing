import { ServiceCard } from "@/components/landing/ServiceCard";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";

export function ServicesSection() {
  const { services } = siteContent.home;

  return (
    <section
      id="services"
      className="page-section section-band section-band--warm scroll-mt-28 border-y border-border/55"
    >
      <div className="container-shell relative py-14 lg:py-[4.8rem]">
        <div className="pointer-events-none absolute -left-20 bottom-[-5rem] hidden h-56 w-56 rounded-[60%_40%_52%_48%/44%_54%_46%_56%] bg-[rgba(247,223,188,0.4)] lg:block" />
        <div className="pointer-events-none absolute right-[-3rem] top-[-2rem] hidden h-40 w-40 rounded-[52%_48%_58%_42%/42%_56%_44%_58%] bg-[rgba(255,247,233,0.78)] lg:block" />
        <div className="soft-dot-grid absolute -right-4 top-10 hidden h-28 w-36 opacity-45 lg:block" />
        <ViewportReveal className="space-y-10" variant="rise">
          <div className="space-y-4 text-center">
            <SectionEyebrow>{services.eyebrow}</SectionEyebrow>
            <h2 className="editorial-headline mx-auto max-w-[15ch] text-[3rem] sm:text-[3.7rem]">
              {services.title}
            </h2>
            <p className="prose-measure mx-auto text-base leading-7 text-text-muted sm:text-[1.05rem]">
              {services.intro}
            </p>
            <div className="mx-auto h-px w-14 bg-accent/70" />
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {services.cards.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
