import { NextResponse } from 'next/server'
import { consultationSchema } from '@/lib/consultation'
import { saveConsultation } from '@/lib/consultation-store'
import { isSmtpConfigured, sendContactMail } from '@/lib/mail'
import { isRateLimited } from '@/lib/rate-limit'
import { person } from '@/lib/site'

export const runtime = 'nodejs'

const STORED_MESSAGE =
  'Your request was saved on this server. Email delivery is not configured, so it has not been sent to an inbox.'

const SENT_MESSAGE = 'Your consultation request was sent by email.'

const UNAVAILABLE_MESSAGE = `This form cannot deliver or store requests right now. Email ${person.email} directly.`

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests. Please wait a few minutes and try again.' },
      { status: 429 },
    )
  }

  const contentLength = Number(req.headers.get('content-length') || 0)
  if (Number.isFinite(contentLength) && contentLength > 20_000) {
    return NextResponse.json({ ok: false, message: 'Request is too large.' }, { status: 413 })
  }

  let body: unknown
  try {
    const raw = await req.text()
    if (raw.length > 20_000) {
      return NextResponse.json({ ok: false, message: 'Request is too large.' }, { status: 413 })
    }
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  const record = body as Record<string, unknown>
  if (typeof record.website === 'string' && record.website.trim()) {
    return NextResponse.json({ ok: false, message: 'Invalid submission.' }, { status: 400 })
  }

  const parsed = consultationSchema.safeParse(record)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message || 'Check the form and try again.' },
      { status: 400 },
    )
  }

  let delivered = false
  if (isSmtpConfigured()) {
    try {
      await sendContactMail(parsed.data)
      delivered = true
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'unknown error'
      console.error(`Consultation email failed: ${detail}`)
    }
  }

  if (delivered) {
    return NextResponse.json({
      ok: true,
      delivered: true,
      stored: false,
      message: SENT_MESSAGE,
    })
  }

  const stored = await saveConsultation(parsed.data)
  if (stored) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      stored: true,
      message: STORED_MESSAGE,
    })
  }

  return NextResponse.json(
    { ok: false, delivered: false, stored: false, message: UNAVAILABLE_MESSAGE },
    { status: 503 },
  )
}
