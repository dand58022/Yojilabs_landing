import Link from "next/link";
import Image from "next/image";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { SystemLineAccent } from "@/components/brand/SystemLineAccent";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const { finalCta } = siteContent.home;

  return (
    <section className="section-band section-band--neutral border-t border-border/60">
      <div className="container-shell py-12 lg:py-14">
        <ViewportReveal variant="fade">
          <div className="card-surface relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(233,163,66,0.12),transparent_28%),linear-gradient(180deg,rgba(252,247,238,0.99),rgba(247,240,227,0.94))] px-6 py-7 sm:px-8">
            <div className="pointer-events-none absolute right-6 top-6 hidden text-accent/35 lg:block">
              <SystemLineAccent className="w-24" />
            </div>
            <div className="pointer-events-none absolute bottom-6 left-6 hidden -scale-x-100 text-accent/12 xl:block">
              <SystemLineAccent className="w-20" />
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <div className="rounded-[1.1rem] border border-border/70 bg-surface/85 p-3 shadow-[var(--shadow-card)]">
                  <Image
                    src={siteConfig.brand.symbol}
                    alt=""
                    width={74}
                    height={69}
                    className="h-auto w-14 sm:w-16"
                  />
                </div>
                <div className="space-y-3">
                  <BrandLockup size="sm" className="text-text-muted" />
                  <div className="space-y-2.5">
                    <h2 className="max-w-[12ch] text-3xl sm:text-4xl">{finalCta.title}</h2>
                    <p className="max-w-2xl text-base leading-7 text-text-muted">
                      {finalCta.description}
                    </p>
                  </div>
                  <SystemLineAccent className="motif-line w-[5.5rem]" />
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
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
