import { submitMockGeneralContact, submitMockProjectIntake } from "@/lib/mocks/mock-submissions";
import { siteConfig } from "@/lib/site-config";
import type { AntiSpamFields } from "@/lib/forms/schema";
import type { GeneralContactFormInput, ProjectIntakeFormInput } from "@/types/site";

export type SubmitOutcome =
  | { state: "success"; message: string }
  | { state: "error"; message: string; fieldErrors?: Record<string, string> };

/**
 * Mocks stay on for localhost so the UI can be exercised without keys.
 * Set NEXT_PUBLIC_FORMS_MODE=live to hit the real route handlers locally.
 */
export const formsUseMocks =
  siteConfig.deploymentStage === "local" && process.env.NEXT_PUBLIC_FORMS_MODE !== "live";

const SUCCESS_COPY = {
  contact: "We emailed a copy to you and will reply within two business days.",
  intake: "We emailed a copy to you. We'll read it before the call and come with questions.",
} as const;

const NETWORK_ERROR = `We couldn't send that. Email ${siteConfig.contactEmail} and we'll pick it up.`;

async function post(
  endpoint: "/api/contact" | "/api/intake",
  payload: Record<string, unknown>,
  kind: keyof typeof SUCCESS_COPY,
): Promise<SubmitOutcome> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as
      | { ok: true }
      | { ok: false; error: string; fieldErrors?: Record<string, string> };

    if (result.ok) {
      return { state: "success", message: SUCCESS_COPY[kind] };
    }

    return { state: "error", message: result.error, fieldErrors: result.fieldErrors };
  } catch {
    return { state: "error", message: NETWORK_ERROR };
  }
}

export async function submitGeneralContact(
  values: GeneralContactFormInput,
  antiSpam: AntiSpamFields,
): Promise<SubmitOutcome> {
  if (formsUseMocks) {
    const result = await submitMockGeneralContact(values, {
      simulate: values.subject.toLowerCase().includes("error") ? "error" : "success",
    });

    return { state: result.state, message: result.message };
  }

  return post("/api/contact", { ...values, ...antiSpam }, "contact");
}

export async function submitProjectIntake(
  values: ProjectIntakeFormInput,
  antiSpam: AntiSpamFields,
  interest: string | null,
): Promise<SubmitOutcome> {
  if (formsUseMocks) {
    const result = await submitMockProjectIntake(values);

    return { state: result.state, message: result.message };
  }

  return post("/api/intake", { ...values, ...antiSpam, interest }, "intake");
}
