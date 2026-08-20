import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const { finalCta } = siteContent.home;

  return (
    <section className="container-shell border-t border-border/70 py-16 lg:py-20">
      <div className="card-surface flex flex-col gap-8 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <Image
            src={siteConfig.brand.symbol}
            alt=""
            width={82}
            height={76}
            className="h-auto w-16 sm:w-20"
          />
          <div className="space-y-3">
            <h2 className="max-w-[12ch] text-3xl sm:text-4xl">{finalCta.title}</h2>
            <p className="max-w-2xl text-base leading-8 text-text-muted">
              {finalCta.description}
            </p>
          </div>
        </div>

        <div>
          <Link
            href={finalCta.primaryCta.href}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            {finalCta.primaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
