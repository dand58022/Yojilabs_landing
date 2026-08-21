import { Suspense } from "react";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { ProjectIntakeForm } from "@/components/forms/ProjectIntakeForm";

export default function StartProjectIntakePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <section className="container-shell py-14 lg:py-18">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="space-y-5">
              <SectionEyebrow>Send Project Details</SectionEyebrow>
              <h1 className="max-w-[12ch] text-5xl sm:text-6xl">
                Give us the context before the call.
              </h1>
              <p className="prose-measure text-lg leading-8 text-text-muted">
                Tell us enough that the first conversation can start with requirements,
                constraints, and goals already on the table. We read every submission
                before we reply.
              </p>
            </div>

            <Suspense fallback={null}>
              <ProjectIntakeForm />
            </Suspense>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
