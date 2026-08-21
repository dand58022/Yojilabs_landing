import "server-only";

import { siteConfig } from "@/lib/site-config";
import {
  hasErrors,
  MIN_SUBMIT_MS,
  validateGeneralContact,
  validateProjectIntake,
  type AntiSpamFields,
  type FieldErrors,
} from "@/lib/forms/schema";
import type { GeneralContactFormInput, ProjectIntakeFormInput } from "@/types/site";

export type SubmissionKind = "contact" | "intake";

export type SubmissionResponse =
  | { ok: true; id: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

interface Env {
  resendApiKey: string | undefined;
  turnstileSecret: string | undefined;
  fromAddress: string;
  toAddress: string;
}

function readEnv(): Env {
  return {
    resendApiKey: process.env.RESEND_API_KEY?.trim() || undefined,
    turnstileSecret: process.env.TURNSTILE_SECRET_KEY?.trim() || undefined,
    fromAddress:
      process.env.CONTACT_FROM_ADDRESS?.trim() || `${siteConfig.name} <hello@yojilabs.com>`,
    toAddress: process.env.CONTACT_TO_ADDRESS?.trim() || siteConfig.contactEmail,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function verifyTurnstile(token: string | null, secret: string, ip: string | null) {
  if (!token) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });

  if (ip) {
    body.set("remoteip", ip);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const result = (await response.json()) as { success?: boolean };

    return result.success === true;
  } catch {
    return false;
  }
}

/**
 * Cheap screens that run before any network call. Returns an error string for
 * the client, or null when the submission looks human.
 */
export function screenSubmission(fields: Partial<AntiSpamFields>): string | null {
  if (typeof fields.company_website === "string" && fields.company_website.trim() !== "") {
    // Honeypot tripped. Pretend success so bots don't learn what failed.
    return "honeypot";
  }

  if (
    typeof fields.startedAt !== "number" ||
    !Number.isFinite(fields.startedAt) ||
    Date.now() - fields.startedAt < MIN_SUBMIT_MS
  ) {
    return "Please take a moment and try sending again.";
  }

  return null;
}

interface Email {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
}

function renderContactEmail(input: GeneralContactFormInput): Email {
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");

  return {
    subject: `[yojilabs.com] ${input.subject}`,
    text,
    html: `<p><b>Name:</b> ${escapeHtml(input.name)}<br><b>Email:</b> ${escapeHtml(input.email)}<br><b>Subject:</b> ${escapeHtml(input.subject)}</p><p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>`,
    replyTo: input.email,
  };
}

function renderIntakeEmail(input: ProjectIntakeFormInput, interest: string | null): Email {
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Business: ${input.business}`,
    interest ? `Interest: ${interest}` : null,
    "",
    input.projectNeeds,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return {
    subject: `[yojilabs.com] Project intake — ${input.business}`,
    text,
    html: `<p><b>Name:</b> ${escapeHtml(input.name)}<br><b>Email:</b> ${escapeHtml(input.email)}<br><b>Business:</b> ${escapeHtml(input.business)}${
      interest ? `<br><b>Interest:</b> ${escapeHtml(interest)}` : ""
    }</p><p>${escapeHtml(input.projectNeeds).replace(/\n/g, "<br>")}</p>`,
    replyTo: input.email,
  };
}

async function sendViaResend(env: Env, email: Email, to: string, replyTo?: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.fromAddress,
      to: [to],
      reply_to: replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend ${response.status}: ${detail.slice(0, 200)}`);
  }

  const result = (await response.json()) as { id?: string };

  return result.id ?? "sent";
}

function autoReply(kind: SubmissionKind, name: string): Email {
  const first = name.trim().split(/\s+/)[0] || "there";
  const what = kind === "contact" ? "message" : "project details";
  const text = `Hi ${first},\n\nThanks — we got your ${what}. We'll reply from hello@yojilabs.com within two business days.\n\n— YojiLabs`;

  return {
    subject: `We got your ${what}`,
    text,
    html: text.replace(/\n/g, "<br>"),
    replyTo: siteConfig.contactEmail,
  };
}

interface HandleOptions {
  kind: SubmissionKind;
  body: unknown;
  clientIp: string | null;
}

export async function handleSubmission({ kind, body, clientIp }: HandleOptions): Promise<{
  status: number;
  payload: SubmissionResponse;
}> {
  if (!body || typeof body !== "object") {
    return { status: 400, payload: { ok: false, error: "Malformed request." } };
  }

  const record = body as Record<string, unknown>;
  const env = readEnv();

  const screened = screenSubmission({
    company_website: record.company_website as string | undefined,
    startedAt: record.startedAt as number | undefined,
    turnstileToken: (record.turnstileToken as string | null | undefined) ?? null,
  });

  if (screened === "honeypot") {
    return { status: 200, payload: { ok: true, id: "received" } };
  }

  if (screened) {
    return { status: 400, payload: { ok: false, error: screened } };
  }

  if (env.turnstileSecret) {
    const verified = await verifyTurnstile(
      (record.turnstileToken as string | null | undefined) ?? null,
      env.turnstileSecret,
      clientIp,
    );

    if (!verified) {
      return {
        status: 400,
        payload: { ok: false, error: "We couldn't verify you're human. Please try again." },
      };
    }
  }

  let email: Email;
  let fieldErrors: FieldErrors<Record<string, string>>;
  let senderName: string;
  let senderEmail: string;

  if (kind === "contact") {
    const input: GeneralContactFormInput = {
      name: String(record.name ?? ""),
      email: String(record.email ?? "").trim(),
      subject: String(record.subject ?? ""),
      message: String(record.message ?? ""),
    };
    fieldErrors = validateGeneralContact(input);
    email = renderContactEmail(input);
    senderName = input.name;
    senderEmail = input.email;
  } else {
    const input: ProjectIntakeFormInput = {
      name: String(record.name ?? ""),
      email: String(record.email ?? "").trim(),
      business: String(record.business ?? ""),
      projectNeeds: String(record.projectNeeds ?? ""),
    };
    fieldErrors = validateProjectIntake(input);
    email = renderIntakeEmail(
      input,
      typeof record.interest === "string" && record.interest ? record.interest.slice(0, 80) : null,
    );
    senderName = input.name;
    senderEmail = input.email;
  }

  if (hasErrors(fieldErrors)) {
    return {
      status: 422,
      payload: {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: fieldErrors as Record<string, string>,
      },
    };
  }

  if (!env.resendApiKey) {
    console.error(`[${kind}] RESEND_API_KEY is not set; submission dropped.`);

    return {
      status: 503,
      payload: {
        ok: false,
        error: `Messages aren't wired up on this deployment yet. Email ${siteConfig.contactEmail} and we'll pick it up.`,
      },
    };
  }

  try {
    const id = await sendViaResend(env, email, env.toAddress, email.replyTo);

    // Auto-reply is best-effort; the inbound mail is what matters.
    await sendViaResend(env, autoReply(kind, senderName), senderEmail).catch((error) => {
      console.warn(`[${kind}] auto-reply failed`, error);
    });

    return { status: 200, payload: { ok: true, id } };
  } catch (error) {
    console.error(`[${kind}] send failed`, error);

    return {
      status: 502,
      payload: {
        ok: false,
        error: `We couldn't send that. Email ${siteConfig.contactEmail} and we'll pick it up.`,
      },
    };
  }
}

export function clientIpFrom(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  return forwarded ? forwarded.split(",")[0].trim() : null;
}
