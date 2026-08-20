import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LegalPlaceholder } from "@/components/routes/LegalPlaceholder";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <LegalPlaceholder
          eyebrow="Terms"
          title="Terms are being prepared."
          description="This placeholder page keeps the footer link structure intact while the full terms content is still being drafted for production."
        />
      </main>
      <LandingFooter />
    </div>
  );
}
