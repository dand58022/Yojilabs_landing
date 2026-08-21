import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { DemoTourRoute } from "@/components/routes/DemoTourRoute";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { demoContent } from "@/content/demo-content";
import { siteContent } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";
import type { DemoId } from "@/types/site";

interface DemoPageProps {
  params: Promise<{ slug: string }>;
}

function findDemo(slug: string) {
  return demoContent.find((demo) => demo.id === (slug as DemoId));
}

// Only real products get a demo page; concept slugs are redirected in next.config.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return demoContent
    .filter((demo) => demo.destination.tier !== "concept")
    .map((demo) => ({ slug: demo.id }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = findDemo(slug);

  if (!demo) {
    return {};
  }

  return {
    title: `${demo.title} demo`,
    description: demo.routeCard.summary,
    alternates: { canonical: `${siteConfig.urls.siteUrl}demos/${demo.id}` },
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const demo = findDemo(slug);

  if (!demo || demo.destination.tier === "concept") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Demos", path: siteContent.routeMap.demos },
          { name: demo.title, path: `/demos/${demo.id}` },
        ]}
      />
      <LandingHeader />
      <main>
        <DemoTourRoute demo={demo} tourUrl={siteConfig.urls.integrations.pantryTourUrl} />
      </main>
      <LandingFooter />
    </div>
  );
}
