import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read woff2 or variable fonts, so the card uses the static
// Satoshi Bold TTF from the Fontshare bundle (free for commercial use).
export default async function OpenGraphImage() {
  const satoshiBold = await readFile(join(process.cwd(), "app/fonts/Satoshi-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #F1E6CC 0%, #F6ECD7 60%, #FCF7EE 100%)",
          color: "#2B2520",
          fontFamily: "Satoshi",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#D35F39",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 960,
            }}
          >
            Custom software and automation for businesses that want to operate better.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 24,
              color: "#6F655A",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 56, height: 3, background: "#D35F39", display: "flex" }} />
            yojilabs.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Satoshi", data: satoshiBold, weight: 700, style: "normal" }],
    },
  );
}
