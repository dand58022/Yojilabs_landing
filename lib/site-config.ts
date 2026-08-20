import { env, seoEnv } from "@/lib/env";
import type { SiteConfig } from "@/types/site";

export const siteConfig = {
  name: "YojiLabs",
  titleTemplate: "%s | YojiLabs",
  description:
    "Custom software, automation, and internal tools built around real business workflows.",
  contactEmail: "hello@yojilabs.com",
  deploymentStage: seoEnv.deploymentStage,
  allowIndexing: seoEnv.allowIndexing,
  brand: {
    logo: "/brand/yojilabs-logo-canonical.png",
    symbol: "/brand/yojilabs-symbol-canonical.png",
    ogImage: "/brand/og-placeholder.png",
  },
  urls: env,
} satisfies SiteConfig;
