import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.urls.siteUrl),
  title: {
    default: siteConfig.name,
    template: siteConfig.titleTemplate,
  },
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
    images: [
      {
        url: siteConfig.urls.ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.urls.ogImageUrl],
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
      className={`${satoshi.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
