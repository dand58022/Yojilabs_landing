"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import styles from "@/components/brand/yojilabs-loader.module.css";

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
          <svg
            viewBox="0 0 116 108"
            fill="none"
            className={styles.mark}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={styles.orange}
              d="M59 8C36 10 19 25 12 46C3 71 14 91 37 99C46 102 56 101 62 98C65 96 66 91 63 88C51 76 45 61 45 45C45 29 51 17 61 10C64 8 62 7 59 8Z"
              fill="#D35F39"
            />
            <circle
              className={styles.gold}
              cx="84"
              cy="62"
              r="21"
              fill="#E9A342"
            />
          </svg>
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
