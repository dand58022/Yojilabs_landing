import type { GeneralContactFormInput, ProjectIntakeFormInput } from "@/types/site";

/**
 * Shared client + server validation. Kept dependency-free on purpose; the
 * shapes are small enough that a hand-rolled validator is clearer than a schema lib.
 */

export const FORM_LIMITS = {
  name: 120,
  email: 254,
  subject: 160,
  business: 160,
  message: 5000,
  projectNeeds: 8000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

function requireText(value: unknown, max: number, emptyMessage: string) {
  if (typeof value !== "string" || !value.trim()) {
    return emptyMessage;
  }

  if (value.length > max) {
    return `Please keep this under ${max} characters.`;
  }

  return undefined;
}

function requireEmail(value: unknown) {
  const empty = requireText(value, FORM_LIMITS.email, "Please share your email.");

  if (empty) {
    return empty;
  }

  return EMAIL_PATTERN.test((value as string).trim())
    ? undefined
    : "That email doesn't look right.";
}

export function validateGeneralContact(values: GeneralContactFormInput) {
  const errors: FieldErrors<GeneralContactFormInput> = {};
  const name = requireText(values.name, FORM_LIMITS.name, "Please share your name.");
  const email = requireEmail(values.email);
  const subject = requireText(values.subject, FORM_LIMITS.subject, "Please add a subject.");
  const message = requireText(
    values.message,
    FORM_LIMITS.message,
    "Please include a short message.",
  );

  if (name) errors.name = name;
  if (email) errors.email = email;
  if (subject) errors.subject = subject;
  if (message) errors.message = message;

  return errors;
}

export function validateProjectIntake(values: ProjectIntakeFormInput) {
  const errors: FieldErrors<ProjectIntakeFormInput> = {};
  const name = requireText(values.name, FORM_LIMITS.name, "Please share your name.");
  const email = requireEmail(values.email);
  const business = requireText(values.business, FORM_LIMITS.business, "Please share your business.");
  const projectNeeds = requireText(
    values.projectNeeds,
    FORM_LIMITS.projectNeeds,
    "Please describe what you need built.",
  );

  if (name) errors.name = name;
  if (email) errors.email = email;
  if (business) errors.business = business;
  if (projectNeeds) errors.projectNeeds = projectNeeds;

  return errors;
}

export function hasErrors<T>(errors: FieldErrors<T>) {
  return Object.values(errors).some(Boolean);
}

/** Fields every form posts alongside its payload, for spam screening. */
export interface AntiSpamFields {
  /** Honeypot — must stay empty. Hidden from humans, filled by naive bots. */
  readonly company_website: string;
  /** Epoch ms when the form mounted; submissions faster than a human are rejected. */
  readonly startedAt: number;
  /** Cloudflare Turnstile token, when the widget is configured. */
  readonly turnstileToken: string | null;
}

export const MIN_SUBMIT_MS = 2_000;
