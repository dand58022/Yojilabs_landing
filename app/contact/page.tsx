import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { ContactRouteShell } from "@/components/routes/ContactRouteShell";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <ContactRouteShell />
      </main>
      <LandingFooter />
    </div>
  );
}
