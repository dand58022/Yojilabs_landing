import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { BookCallMockForm } from "@/components/forms/BookCallMockForm";

export function BookCallRouteShell() {
  return (
    <section className="container-shell py-14 lg:py-18">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-5">
          <SectionEyebrow>Book a Call</SectionEyebrow>
          <h1 className="max-w-[12ch] text-5xl sm:text-6xl">
            Pick a time and keep the next conversation focused.
          </h1>
          <p className="prose-measure text-lg leading-8 text-text-muted">
            This localhost experience is fully mocked, but it mirrors the on-site
            path we want: a clear intro, a few believable availability options, and
            just enough context collection to prep the follow-up conversation well.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div className="card-surface px-6 py-7 sm:px-7">
            <p className="text-sm font-semibold text-text-strong">What to expect</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-text-muted">
              <p>We will use the call to clarify the workflow, urgency, and success criteria.</p>
              <p>The available times below are mocked for localhost and do not hit a real calendar.</p>
              <p>If you already have details written out, the intake route may prep the call even better.</p>
            </div>
          </div>

          <BookCallMockForm />
        </div>
      </div>
    </section>
  );
}
