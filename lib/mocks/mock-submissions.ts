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
        "We could not send your message in localhost mode. Please try again in a moment.",
      payload: input,
    };
  }

  return {
    state: "success",
    submissionId: createSubmissionId("contact"),
    message:
      "Your message was received in localhost mode. We typically reply within 1–2 business days.",
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
        "We could not save your project details in localhost mode. Please try again.",
      payload: input,
    };
  }

  return {
    state: "success",
    submissionId: createSubmissionId("intake"),
    message:
      "Your project details were captured in localhost mode so the next conversation can start with context.",
    payload: input,
  };
}
