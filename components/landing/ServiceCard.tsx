import type { ServiceCardContent } from "@/types/site";

interface ServiceCardProps {
  service: ServiceCardContent;
}

function ServiceIcon({ id }: { id: ServiceCardContent["id"] }) {
  switch (id) {
    case "custom-software":
      return (
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-accent" fill="none" stroke="currentColor" strokeWidth="2.6">
          <path d="M17 14 8 24l9 10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m31 14 9 10-9 10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "automation-integrations":
      return (
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-accent" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M19 8v9h10V8h5a6 6 0 0 1 6 6v5h-9v10h9v5a6 6 0 0 1-6 6h-5v-9H19v9h-5a6 6 0 0 1-6-6v-5h9V19H8v-5a6 6 0 0 1 6-6h5Z" strokeLinejoin="round" />
        </svg>
      );
    case "operations-systems":
      return (
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-accent" fill="none" stroke="currentColor" strokeWidth="2.4">
          <ellipse cx="24" cy="11" rx="11" ry="5" />
          <path d="M13 11v10c0 2.8 4.9 5 11 5s11-2.2 11-5V11" />
          <path d="M13 21v10c0 2.8 4.9 5 11 5s11-2.2 11-5V21" />
        </svg>
      );
    case "data-intelligence":
      return (
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-accent" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M10 35V24" strokeLinecap="round" />
          <path d="M20 35V14" strokeLinecap="round" />
          <path d="M30 35V19" strokeLinecap="round" />
          <path d="M40 35V10" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="card-surface h-full px-6 py-7 sm:px-7">
      <ServiceIcon id={service.id} />
      <div className="mt-8 space-y-4">
        <h3 className="text-2xl">{service.title}</h3>
        <p className="text-base leading-8 text-text-muted">
          {service.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {service.supportingTopics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-border/80 bg-surface-soft px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-text-muted"
          >
            {topic}
          </span>
        ))}
      </div>
    </article>
  );
}
