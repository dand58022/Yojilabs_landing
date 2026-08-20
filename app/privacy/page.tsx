import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LegalPlaceholder } from "@/components/routes/LegalPlaceholder";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <LegalPlaceholder
          eyebrow="Privacy"
          title="Privacy details are being finalized."
          description="This placeholder page exists so the landing site can ship with working legal links during localhost-first development. The production privacy policy will be added before launch."
        />
      </main>
      <LandingFooter />
    </div>
  );
}
