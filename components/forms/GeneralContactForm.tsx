"use client";

import { useState } from "react";
import { submitMockGeneralContact } from "@/lib/mocks/mock-submissions";
import type { GeneralContactFormInput } from "@/types/site";

interface GeneralContactFormProps {
  title: string;
  responseNote: string;
  embedded?: boolean;
}

type FormErrors = Partial<Record<keyof GeneralContactFormInput, string>>;

const initialValues: GeneralContactFormInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values: GeneralContactFormInput) {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please share your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please share your email.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please add a subject.";
  }

  if (!values.message.trim()) {
    errors.message = "Please include a short message.";
  }

  return errors;
}

export function GeneralContactForm({
  title,
  responseNote,
  embedded = false,
}: GeneralContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
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

    const result = await submitMockGeneralContact(values, {
      // Keep the keyword trigger for local QA without exposing debug instructions in the UI.
      simulate: values.subject.toLowerCase().includes("error") ? "error" : "success",
    });

    if (result.state === "error") {
      setSubmitState("error");
      setFeedback(result.message);
      return;
    }

    setSubmitState("success");
    setFeedback(result.message);
    setValues(initialValues);
    setErrors({});
  }

  function updateField<K extends keyof GeneralContactFormInput>(
    key: K,
    value: GeneralContactFormInput[K],
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

  return (
    <div className={embedded ? "px-0 py-0 sm:px-0" : "card-surface px-6 py-7 sm:px-7"}>
      <p className="text-sm font-semibold text-text-strong">{title}</p>

      {submitState === "success" ? (
        <div className="mt-5 space-y-4 rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-5 py-5">
          <p className="text-base font-semibold text-text-strong">
            Message received
          </p>
          <p className="text-sm leading-7 text-text-muted">{feedback}</p>
          <p className="text-sm leading-7 text-text-muted">{responseNote}</p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/35 hover:text-accent"
            onClick={() => {
              setSubmitState("idle");
              setFeedback("");
            }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-text-strong">
              <span>Name</span>
              <input
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
              {errors.name ? (
                <span className="block text-xs font-medium text-accent">
                  {errors.name}
                </span>
              ) : null}
            </label>

            <label className="space-y-2 text-sm font-medium text-text-strong">
              <span>Email</span>
              <input
                type="email"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
              {errors.email ? (
                <span className="block text-xs font-medium text-accent">
                  {errors.email}
                </span>
              ) : null}
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-text-strong">
            <span>Subject</span>
            <input
              value={values.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              className="w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
            {errors.subject ? (
              <span className="block text-xs font-medium text-accent">
                {errors.subject}
              </span>
            ) : null}
          </label>

          <label className="space-y-2 text-sm font-medium text-text-strong">
            <span>Message</span>
            <textarea
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={5}
              className="w-full rounded-[var(--radius-control)] border border-border bg-surface-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
            {errors.message ? (
              <span className="block text-xs font-medium text-accent">
                {errors.message}
              </span>
            ) : null}
          </label>

          {submitState === "error" ? (
            <div className="rounded-[var(--radius-card)] border border-[#D8C08F] bg-surface-soft px-4 py-3 text-sm leading-7 text-accent">
              {feedback}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-end gap-4">
            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="inline-flex items-center justify-center rounded-[var(--radius-card)] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitState === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
