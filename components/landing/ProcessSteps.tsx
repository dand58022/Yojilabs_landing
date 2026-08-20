import type { ProcessStepContent } from "@/types/site";

interface ProcessStepsProps {
  steps: readonly ProcessStepContent[];
}

function ProcessStepIcon({ id }: { id: ProcessStepContent["id"] }) {
  if (id === "discover") {
    return (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <circle cx="22" cy="22" r="10" />
        <path d="m30 30 8 8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "prototype") {
    return (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <path d="M31 10 38 17 18 37H10v-8L31 10Z" strokeLinejoin="round" />
        <path d="m27 14 7 7" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "build") {
    return (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
      >
        <path d="M16 15 8 24l8 9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m32 15 8 9-8 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="M10 34 19 24l8 7 11-15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 16h7v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="absolute left-[8%] right-[8%] top-9 hidden border-t border-dashed border-accent/35 xl:block" />
      {steps.map((step) => (
        <article key={step.id} className="relative space-y-4">
          <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-border/75 bg-[rgba(255,249,240,0.9)] shadow-[0_12px_26px_rgba(39,29,22,0.05)]">
            <ProcessStepIcon id={step.id} />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-strong">
              {step.stepNumber}. {step.title}
            </p>
            <p className="text-sm leading-7 text-text-muted">{step.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
