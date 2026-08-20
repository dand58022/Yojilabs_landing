import Link from "next/link";
import { ViewportReveal } from "@/components/landing/ViewportReveal";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const { finalCta } = siteContent.home;

  return (
    <section className="section-band section-band--neutral border-t border-border/60">
      <div className="container-shell py-10 lg:py-12">
        <ViewportReveal variant="fade">
          <div className="card-surface relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,252,246,0.99),rgba(247,239,226,0.96))] px-6 py-7 sm:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_72%,rgba(247,228,198,0.34),transparent_24%),radial-gradient(circle_at_82%_26%,rgba(241,177,117,0.14),transparent_20%)]" />
            <div className="soft-dot-grid absolute bottom-6 right-6 hidden h-16 w-16 opacity-20 lg:block" />
            <div className="soft-dot-grid absolute left-[10.5rem] top-6 hidden h-10 w-10 opacity-16 lg:block" />

            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)_auto] lg:items-center">
              <div className="relative flex min-h-[8.25rem] items-center overflow-hidden rounded-[1.6rem] border border-border/60 bg-[linear-gradient(180deg,rgba(255,252,246,0.8),rgba(251,244,233,0.78))] px-5 py-4 shadow-[0_14px_30px_rgba(39,29,22,0.04)]">
                <div className="absolute -left-10 bottom-[-2rem] h-32 w-24 rounded-[62%_38%_44%_56%/42%_56%_44%_58%] bg-[linear-gradient(180deg,rgba(240,145,63,0.92),rgba(211,95,57,0.9))]" />
                <div className="absolute left-11 top-[-0.8rem] h-24 w-16 rounded-[52%_48%_58%_42%/28%_34%_66%_72%] bg-[rgba(255,239,214,0.92)]" />
                <div className="absolute right-3 top-5 h-14 w-14 rounded-[60%_40%_54%_46%/48%_52%_48%_52%] bg-[rgba(249,231,202,0.5)]" />
                <div className="soft-dot-grid absolute bottom-3 left-14 h-10 w-10 opacity-18" />
                <div className="relative z-10 drop-shadow-[0_6px_16px_rgba(211,95,57,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={siteConfig.brand.symbol}
                    alt=""
                    width={64}
                    height={63}
                  />
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="hidden h-20 w-px bg-border/70 lg:block" />
                <div className="space-y-2.5">
                  <h2 className="editorial-headline max-w-[12ch] text-[2.8rem] sm:text-[3.65rem]">{finalCta.title}</h2>
                  <p className="max-w-2xl text-base leading-7 text-text-muted">
                    {finalCta.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <Link
                  href={finalCta.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(211,95,57,0.22)] transition hover:bg-accent/90"
                >
                  {finalCta.primaryCta.label}
                </Link>
                {finalCta.secondaryCta ? (
                  <Link
                    href={finalCta.secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
                  >
                    {finalCta.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </ViewportReveal>
      </div>
    </section>
  );
}
