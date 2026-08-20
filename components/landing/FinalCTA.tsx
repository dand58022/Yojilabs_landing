import Link from "next/link";
import Image from "next/image";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const { finalCta } = siteContent.home;

  return (
    <section className="section-band section-band--neutral border-t border-border/60">
      <div className="container-shell py-12 lg:py-14">
        <ViewportReveal variant="fade">
          <div className="card-surface relative overflow-hidden flex flex-col gap-6 px-6 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <Image
              src={siteConfig.brand.symbol}
              alt=""
              width={240}
              height={223}
              className="pointer-events-none absolute -bottom-20 -left-14 hidden h-auto w-44 opacity-90 sm:block"
            />
            <div className="flex items-center gap-5">
              <Image
                src={siteConfig.brand.symbol}
                alt=""
                width={82}
                height={76}
                className="h-auto w-16 sm:w-20"
              />
              <div className="space-y-2.5">
                <h2 className="max-w-[12ch] text-3xl sm:text-4xl">{finalCta.title}</h2>
                <p className="max-w-2xl text-base leading-7 text-text-muted">
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
        </ViewportReveal>
      </div>
    </section>
  );
}
