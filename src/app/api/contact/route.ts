import { NextResponse } from "next/server";
import { isSmtpConfigured, sendContactMail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<{
      name: string;
      email: string;
      subject: string;
      message: string;
      website?: string;
    }>;

    if (body.website) {
      return NextResponse.json({ ok: false, message: "Invalid submission." }, { status: 400 });
    }

    if (!isSmtpConfigured()) {
      return NextResponse.json(
        { ok: false, message: "Contact email is not configured yet. Please use the direct email link." },
        { status: 503 }
      );
    }

    const validated = validatePayload(body);

    await sendContactMail(validated);

    return NextResponse.json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const status =
      message.toLowerCase().includes("missing") ||
      message.toLowerCase().includes("invalid") ||
      message.toLowerCase().includes("not configured")
        ? 400
        : 500;
    return NextResponse.json({ ok: false, message }, { status });
  }
}

function validatePayload(payload: Partial<{
  name: string;
  email: string;
  subject: string;
  message: string;
}>) {
  const fields = ["name", "email", "subject", "message"] as const;

  for (const field of fields) {
    const value = payload[field];
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`Invalid or missing field: ${field}`);
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email!.trim())) {
    throw new Error("Invalid email format");
  }

  return {
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    subject: payload.subject!.trim(),
    message: payload.message!.trim()
  };
}
