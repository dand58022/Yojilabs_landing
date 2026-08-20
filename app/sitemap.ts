import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    siteContent.routeMap.home,
    siteContent.routeMap.demos,
    siteContent.routeMap.startProject,
    siteContent.routeMap.startProjectBook,
    siteContent.routeMap.startProjectIntake,
    siteContent.routeMap.privacy,
    siteContent.routeMap.terms,
  ];

  return staticRoutes.map((path) => ({
    url: new URL(path, siteConfig.urls.siteUrl).toString(),
    lastModified: new Date("2026-08-20T00:00:00.000Z"),
  }));
}
