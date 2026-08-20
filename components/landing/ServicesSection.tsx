import { ServiceCard } from "@/components/landing/ServiceCard";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { siteContent } from "@/content/site-content";

export function ServicesSection() {
  const { services } = siteContent.home;

  return (
    <section id="services" className="section-band section-band--warm border-y border-border/60">
      <div className="container-shell py-14 lg:py-[4.5rem]">
        <div className="space-y-10">
          <div className="space-y-4">
            <SectionEyebrow>{services.eyebrow}</SectionEyebrow>
            <h2 className="max-w-[14ch] text-4xl sm:text-5xl">{services.title}</h2>
            <p className="prose-measure text-base leading-7 text-text-muted sm:text-[1.05rem]">
              {services.intro}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {services.cards.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
