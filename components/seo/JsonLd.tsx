import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

type JsonLdValue = Record<string, unknown>;

function absolute(path: string) {
  return new URL(path, siteConfig.urls.siteUrl).toString();
}

function JsonLdScript({ data }: { data: JsonLdValue }) {
  // JSON-LD is emitted as a plain script; escape "<" so content can't close the tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function OrganizationJsonLd() {
  const organization: JsonLdValue = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.urls.siteUrl}#organization`,
    name: siteConfig.name,
    url: siteConfig.urls.siteUrl,
    logo: absolute(siteConfig.brand.logo),
    email: siteConfig.contactEmail,
    description: siteConfig.description,
    sameAs: siteConfig.socialProfiles,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.contactEmail,
      url: absolute(siteContent.routeMap.contact),
    },
  };

  const website: JsonLdValue = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.urls.siteUrl}#website`,
    url: siteConfig.urls.siteUrl,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.urls.siteUrl}#organization` },
  };

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={website} />
    </>
  );
}

export function ServicesJsonLd() {
  const services = siteContent.home.services.cards.map((card) => ({
    "@type": "Service",
    name: card.title,
    description: card.description,
    provider: { "@id": `${siteConfig.urls.siteUrl}#organization` },
    areaServed: "US",
    url: absolute(siteContent.routeMap.servicesAnchor),
  }));

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${siteConfig.name} services`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: service,
        })),
      }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbJsonLd({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absolute(item.path),
        })),
      }}
    />
  );
}
