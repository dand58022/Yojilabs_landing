import type { ProcessStepContent } from "@/types/site";

interface ProcessStepsProps {
  steps: readonly ProcessStepContent[];
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step) => (
        <article key={step.id} className="card-surface px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {step.stepNumber}
          </p>
          <h3 className="mt-4 text-2xl">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-text-muted">
            {step.description}
          </p>
        </article>
      ))}
    </div>
  );
}
