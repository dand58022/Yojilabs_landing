import { LandingBrandEntrance } from "@/components/brand/LandingBrandEntrance";
import { AboutContactSection } from "@/components/landing/AboutContactSection";
import { DemosPreviewSection } from "@/components/landing/DemosPreviewSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingBrandEntrance />
      <LandingHeader />

      <main>
        <HeroSection />
        <ServicesSection />
        <DemosPreviewSection />
        <AboutContactSection />
        <FinalCTA />
      </main>

      <LandingFooter />
    </div>
  );
}
