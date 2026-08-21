import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/Inter-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.urls.siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: siteConfig.titleTemplate,
  },
  applicationName: siteConfig.name,
  keywords: [
    "custom software",
    "business automation",
    "internal tools",
    "operations systems",
    "restaurant inventory software",
    "software agency",
  ],
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.urls.canonicalUrl,
  },
  openGraph: {
    type: "website",
    url: siteConfig.urls.canonicalUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: siteConfig.allowIndexing,
    follow: siteConfig.allowIndexing,
    googleBot: {
      index: siteConfig.allowIndexing,
      follow: siteConfig.allowIndexing,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#F1E6CC",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
