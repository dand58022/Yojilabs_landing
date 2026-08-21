import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site-content";
import { demoContent } from "@/content/demo-content";
import { siteConfig } from "@/lib/site-config";

// Privacy and Terms are placeholders today; they're left out until they carry
// real copy so thin legal pages don't get indexed under the brand.
export default function sitemap(): MetadataRoute.Sitemap {
  const demoRoutes = demoContent
    .filter((demo) => demo.destination.tier !== "concept")
    .map((demo) => `/demos/${demo.id}`);

  const routes: Array<{ path: string; priority: number }> = [
    { path: siteContent.routeMap.home, priority: 1 },
    { path: siteContent.routeMap.demos, priority: 0.8 },
    ...demoRoutes.map((path) => ({ path, priority: 0.7 })),
    { path: siteContent.routeMap.contact, priority: 0.7 },
    { path: siteContent.routeMap.startProject, priority: 0.7 },
    { path: siteContent.routeMap.startProjectBook, priority: 0.6 },
    { path: siteContent.routeMap.startProjectIntake, priority: 0.6 },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.urls.siteUrl).toString(),
    lastModified,
    priority,
  }));
}
