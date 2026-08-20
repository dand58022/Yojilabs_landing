import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { StartProjectChoice } from "@/components/routes/StartProjectChoice";

export default function StartProjectPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <StartProjectChoice />
      </main>
      <LandingFooter />
    </div>
  );
}
