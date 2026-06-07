import nodemailer from "nodemailer";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const SMTP_VARS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "TO_EMAIL"] as const;

function usesLegacyGmailEnv(): boolean {
  return Boolean(process.env.EMAIL_USER?.trim() && process.env.EMAIL_PASSWORD?.trim());
}

export function isSmtpConfigured(): boolean {
  if (usesLegacyGmailEnv()) return true;
  return SMTP_VARS.every((name) => Boolean(process.env[name]?.trim()));
}

function getRecipientEmail(senderEmail: string): string {
  return process.env.TO_EMAIL?.trim() || senderEmail;
}

function createTransporter() {
  if (usesLegacyGmailEnv()) {
    return nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER!.trim(),
        pass: process.env.EMAIL_PASSWORD!.trim()
      }
    });
  }

  const port = Number(process.env.SMTP_PORT);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST!.trim(),
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER!.trim(),
      pass: process.env.SMTP_PASS!.trim()
    }
  });
}

function getSenderEmail(): string {
  if (usesLegacyGmailEnv()) {
    return process.env.EMAIL_USER!.trim();
  }
  return process.env.SMTP_USER!.trim();
}

export async function sendContactMail(data: ContactPayload): Promise<void> {
  if (!isSmtpConfigured()) {
    throw new Error("Email is not configured on the server.");
  }

  const senderEmail = getSenderEmail();
  const toEmail = getRecipientEmail(senderEmail);
  const transporter = createTransporter();

  const text = [
    "New contact message from NRG Portfolio",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message
  ].join("\n");

  const html = `
    <h2>New Contact — NRG Portfolio</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
  `;

  await transporter.sendMail({
    from: `"NRG Portfolio Contact" <${senderEmail}>`,
    to: toEmail,
    subject: `[Portfolio] ${data.subject}`,
    text,
    html,
    replyTo: data.email
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
