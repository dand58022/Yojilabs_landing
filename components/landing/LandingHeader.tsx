"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";
import { MobileNav } from "@/components/landing/MobileNav";

export function LandingHeader() {
  const { header } = siteContent.navigation;
  const { primaryCta } = siteContent.navigation;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 16);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-[background-color,border-color] duration-[var(--motion-standard)] ease-[var(--ease-standard)] ${
        isScrolled
          ? "border-border/70 bg-background/94"
          : "border-border/55 bg-background/82"
      }`}
    >
      <div className="hero-shell flex items-center justify-between py-4">
        <Link
          href="/"
          className="inline-flex items-center rounded-[var(--radius-control)] px-1.5 py-1 transition hover:opacity-90 focus-visible:outline-offset-4"
        >
          <Image
            src={siteConfig.brand.logo}
            alt="YojiLabs"
            width={198}
            height={36}
            priority
            className="h-auto w-[170px] sm:w-[222px]"
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
