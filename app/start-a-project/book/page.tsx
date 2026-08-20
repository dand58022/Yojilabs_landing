import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { BookCallRouteShell } from "@/components/routes/BookCallRouteShell";

export default function StartProjectBookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <BookCallRouteShell />
      </main>
      <LandingFooter />
    </div>
  );
}
