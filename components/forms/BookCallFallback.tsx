import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

/** Shown when no calendar is configured — never a fake slot picker in production. */
export function BookCallFallback() {
  return (
    <div className="card-surface flex h-full flex-col justify-between gap-6 px-6 py-7 sm:px-7" data-testid="book-call-fallback">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-text-strong">Request a time</p>
        <p className="text-sm leading-7 text-text-muted">
          Our calendar isn&apos;t connected on this deployment yet. Send a few details and
          two or three windows that work for you, and we&apos;ll confirm by email.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={`${siteContent.routeMap.startProjectIntake}?interest=call`}
          className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
        >
          Send details and times
        </Link>
        <a
          href={`mailto:${siteConfig.contactEmail}?subject=Book%20a%20call`}
          className="text-sm font-semibold text-text-muted transition hover:text-accent"
        >
          or email {siteConfig.contactEmail}
        </a>
      </div>
    </div>
  );
}
