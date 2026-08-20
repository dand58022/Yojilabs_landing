"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import styles from "@/components/brand/yojilabs-loader.module.css";
import { siteConfig } from "@/lib/site-config";

interface YojiLabsLoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "full";
  loop?: boolean;
  timingPreset?: "default" | "startup";
  className?: string;
  onComplete?: () => void;
}

function joinClasses(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function YojiLabsLoader({
  size = "md",
  variant = "full",
  loop = false,
  timingPreset = "default",
  className,
  onComplete,
}: YojiLabsLoaderProps) {
  useEffect(() => {
    if (loop || !onComplete) {
      return;
    }

    const mediaQuery =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    const timeout = window.setTimeout(
      () => {
        onComplete();
      },
      mediaQuery?.matches ? 120 : 900,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loop, onComplete]);

  const timingStyles: CSSProperties | undefined =
    timingPreset === "startup"
      ? {
          ["--loader-duration" as string]: "780ms",
          ["--loader-delay-wordmark" as string]: "420ms",
          ["--loader-wordmark-duration" as string]: "340ms",
        }
      : undefined;

  return (
    <div
      className={joinClasses(
        styles.root,
        styles[size],
        loop && styles.loop,
        className,
      )}
      style={timingStyles}
      aria-label="YojiLabs loading"
      role="status"
    >
      <div
        className={joinClasses(
          styles.frame,
          variant === "mark" && styles.markOnly,
        )}
      >
        <span className={styles.markWrap} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.brand.symbol}
            alt=""
            width={116}
            height={114}
            className={styles.mark}
          />
        </span>

        {variant === "full" ? (
          <span className={styles.wordmark} aria-hidden="true">
            YOJI LABS
          </span>
        ) : null}
      </div>
    </div>
  );
}
