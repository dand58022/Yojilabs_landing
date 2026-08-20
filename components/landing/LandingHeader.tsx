import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";
import { MobileNav } from "@/components/landing/MobileNav";

export function LandingHeader() {
  const { header } = siteContent.navigation;
  const { primaryCta } = siteContent.navigation;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="hero-shell flex items-center justify-between py-4">
        <Link
          href="/"
          className="inline-flex items-center rounded-[var(--radius-control)] px-1 py-1 transition hover:opacity-90 focus-visible:outline-offset-4"
        >
          <Image
            src={siteConfig.brand.logo}
            alt="YojiLabs"
            width={198}
            height={36}
            priority
            className="h-auto w-[154px] sm:w-[198px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {header.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-foreground transition hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            {primaryCta.label}
          </Link>
        </div>

        <div className="lg:hidden">
          <MobileNav items={header} primaryCta={primaryCta} />
        </div>
      </div>
    </header>
  );
}
