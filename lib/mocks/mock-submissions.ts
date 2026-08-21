import { waitForMockDelay } from "@/lib/mocks/mock-delay";
import type {
  GeneralContactFormInput,
  MockRequestOptions,
  MockSubmissionResult,
  ProjectIntakeFormInput,
} from "@/types/site";

function shouldSimulateError(options?: MockRequestOptions) {
  return options?.simulate === "error";
}

function createSubmissionId(prefix: string) {
  return `${prefix}-mock-001`;
}

export async function submitMockGeneralContact(
  input: GeneralContactFormInput,
  options?: MockRequestOptions,
): Promise<MockSubmissionResult<GeneralContactFormInput>> {
  await waitForMockDelay(options?.delayMs);

  if (shouldSimulateError(options)) {
    return {
      state: "error",
      submissionId: null,
      message:
        "Local preview: simulated send failure. Try again in a moment.",
      payload: input,
    };
  }

  return {
    state: "success",
    submissionId: createSubmissionId("contact"),
    message:
      "Local preview: your message was captured (nothing was sent). We typically reply within 1–2 business days.",
    payload: input,
  };
}

export async function submitMockProjectIntake(
  input: ProjectIntakeFormInput,
  options?: MockRequestOptions,
): Promise<MockSubmissionResult<ProjectIntakeFormInput>> {
  await waitForMockDelay(options?.delayMs);

  if (shouldSimulateError(options)) {
    return {
      state: "error",
      submissionId: null,
      message:
        "Local preview: simulated save failure. Please try again.",
      payload: input,
    };
  }

  return {
    state: "success",
    submissionId: createSubmissionId("intake"),
    message:
      "Local preview: your project details were captured (nothing was sent).",
    payload: input,
  };
}
