"use client";

import Link from "next/link";
import { useState } from "react";
import { submitMockProjectIntake } from "@/lib/mocks/mock-submissions";
import { siteContent } from "@/content/site-content";
import type { ProjectIntakeFormInput } from "@/types/site";

type IntakeErrors = Partial<Record<keyof ProjectIntakeFormInput, string>>;

const initialValues: ProjectIntakeFormInput = {
  name: "",
  email: "",
  business: "",
  projectNeeds: "",
};

function validate(values: ProjectIntakeFormInput) {
  const errors: IntakeErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please share your name.";
  }
  if (!values.email.trim()) {
    errors.email = "Please share your email.";
  }
  if (!values.business.trim()) {
    errors.business = "Please share your business.";
  }
  if (!values.projectNeeds.trim()) {
    errors.projectNeeds = "Please describe what you need built.";
  }

  return errors;
}

export function ProjectIntakeForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      return;
    }

    setSubmitState("submitting");
    const result = await submitMockProjectIntake(values);
    setFeedback(result.message);
    setSubmitState(result.state);

    if (result.state === "success") {
      setValues(initialValues);
      setErrors({});
    }
  }

  function updateField<K extends keyof ProjectIntakeFormInput>(
    key: K,
    value: ProjectIntakeFormInput[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((current) => ({
        ...current,
        [key]: undefined,
      }));
    }
  }

  if (submitState === "success") {
    return (
      <div className="card-surface px-6 py-7 sm:px-7">
        <p className="text-base font-semibold text-text-strong">Details received</p>
        <p className="mt-4 text-sm leading-7 text-text-muted">{feedback}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={siteContent.routeMap.startProjectBook}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            {siteContent.sharedLabels.bookCall}
          </Link>
          <Link
            href={siteContent.routeMap.demos}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
          >
            {siteContent.sharedLabels.exploreDemos}
          </Link>
          <Link
            href={siteContent.routeMap.servicesAnchor}
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
          >
            {siteContent.sharedLabels.viewServices}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="card-surface space-y-4 px-6 py-7 sm:px-7" onSubmit={handleSubmit} noValidate>
      <label className="space-y-2 text-sm font-medium text-text-strong">
        <span>Name</span>
        <input
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        />
        {errors.name ? <span className="block text-xs font-medium text-accent">{errors.name}</span> : null}
      </label>

      <label className="space-y-2 text-sm font-medium text-text-strong">
        <span>Email</span>
        <input
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        />
        {errors.email ? <span className="block text-xs font-medium text-accent">{errors.email}</span> : null}
      </label>

      <label className="space-y-2 text-sm font-medium text-text-strong">
        <span>Business</span>
        <input
          value={values.business}
          onChange={(event) => updateField("business", event.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        />
        {errors.business ? <span className="block text-xs font-medium text-accent">{errors.business}</span> : null}
      </label>

      <label className="space-y-2 text-sm font-medium text-text-strong">
        <span>What do you need built?</span>
        <textarea
          value={values.projectNeeds}
          onChange={(event) => updateField("projectNeeds", event.target.value)}
          rows={6}
          className="w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        />
        {errors.projectNeeds ? (
          <span className="block text-xs font-medium text-accent">{errors.projectNeeds}</span>
        ) : null}
      </label>

      {submitState === "error" ? (
        <div className="rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-4 py-3 text-sm leading-7 text-accent">
          {feedback}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitState === "submitting" ? "Sending..." : "Send project details"}
      </button>
    </form>
  );
}
