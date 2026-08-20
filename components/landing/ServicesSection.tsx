import { ServiceCard } from "@/components/landing/ServiceCard";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { siteContent } from "@/content/site-content";

export function ServicesSection() {
  const { services } = siteContent.home;

  return (
    <section id="services" className="container-shell border-t border-border/70 py-16 lg:py-20">
      <div className="space-y-12">
        <div className="space-y-5">
          <SectionEyebrow>{services.eyebrow}</SectionEyebrow>
          <h2 className="max-w-[14ch] text-4xl sm:text-5xl">{services.title}</h2>
          <p className="prose-measure text-base leading-8 text-text-muted sm:text-lg">
            {services.intro}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {services.cards.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
