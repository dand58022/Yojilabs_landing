import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: "/",
      },
    };
  }

  // AI search/answer crawlers are explicitly welcome: for a marketing site,
  // being cited in ChatGPT / Claude / Perplexity answers is the goal.
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Google-Extended",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.urls.siteUrl}sitemap.xml`,
  };
}
