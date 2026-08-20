import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { DemosPlaceholderGrid } from "@/components/routes/DemosPlaceholderGrid";

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <DemosPlaceholderGrid />
      </main>
      <LandingFooter />
    </div>
  );
}
