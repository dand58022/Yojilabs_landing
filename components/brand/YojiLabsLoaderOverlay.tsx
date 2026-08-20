"use client";

import { YojiLabsLoader } from "@/components/brand/YojiLabsLoader";

interface YojiLabsLoaderOverlayProps {
  visible?: boolean;
  loop?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "full";
  onComplete?: () => void;
}

export function YojiLabsLoaderOverlay({
  visible = true,
  loop = false,
  size = "lg",
  variant = "full",
  onComplete,
}: YojiLabsLoaderOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 grid place-items-center bg-[linear-gradient(180deg,rgba(250,247,241,0.985)_0%,rgba(247,243,236,0.972)_100%)] transition-opacity duration-[var(--motion-standard)] ease-[var(--ease-standard)] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <YojiLabsLoader
        size={size}
        variant={variant}
        loop={loop}
        onComplete={onComplete}
      />
    </div>
  );
}
