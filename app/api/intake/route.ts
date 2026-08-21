import { clientIpFrom, handleSubmission } from "@/lib/server/contact";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const { status, payload } = await handleSubmission({
    kind: "intake",
    body,
    clientIp: clientIpFrom(request),
  });

  return Response.json(payload, { status });
}
