import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

interface BrandLockupProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

function joinClasses(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

const sizeMap = {
  sm: {
    symbolWidth: 20,
    wordmark: "text-[0.88rem] tracking-[0.34em]",
    gap: "gap-3",
    symbolClass: "w-5",
  },
  md: {
    symbolWidth: 24,
    wordmark: "text-[1rem] tracking-[0.38em]",
    gap: "gap-3.5",
    symbolClass: "w-6",
  },
  lg: {
    symbolWidth: 28,
    wordmark: "text-[1.12rem] tracking-[0.42em] sm:text-[1.22rem]",
    gap: "gap-4",
    symbolClass: "w-7",
  },
} as const;

export function BrandLockup({
  size = "md",
  className,
  priority = false,
}: BrandLockupProps) {
  const config = sizeMap[size];

  return (
    <span className={joinClasses("inline-flex items-center", config.gap, className)}>
      <Image
        src={siteConfig.brand.symbol}
        alt=""
        width={config.symbolWidth}
        height={Math.round((config.symbolWidth * 108) / 116)}
        priority={priority}
        className={joinClasses("h-auto", config.symbolClass)}
      />
      <span
        className={joinClasses(
          "font-medium uppercase leading-none text-text-strong",
          config.wordmark,
        )}
        aria-label="YojiLabs"
      >
        YOJI LABS
      </span>
    </span>
  );
}
