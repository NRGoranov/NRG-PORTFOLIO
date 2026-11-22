import { afterAll, describe, expect, it } from 'vitest'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { POST } from '@/app/api/contact/route'
import { consultationSchema } from '@/lib/consultation'
import { isSmtpConfigured } from '@/lib/mail'
import { isRateLimited } from '@/lib/rate-limit'

const storePath = path.join(process.cwd(), 'data', 'consultations.json')
const testEmail = 'consultation-test@example.com'

const valid = {
  name: 'Ada Lovelace',
  businessName: 'Example Restaurant',
  email: testEmail,
  phone: '',
  businessType: 'Restaurant',
  service: 'Not Sure Yet',
  message: 'We need help with unanswered reservation questions.',
}

describe('consultation schema', () => {
  it('accepts a complete request with a blank phone', () => {
    expect(consultationSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects a bad email, a short message, and a nonsense phone', () => {
    const result = consultationSchema.safeParse({
      ...valid,
      email: 'not-an-email',
      phone: 'call me',
      message: 'Too short',
    })
    expect(result.success).toBe(false)
  })
})

describe('contact route persistence', () => {
  it('stores a request and does not claim it was emailed when SMTP is unset', async () => {
    if (isSmtpConfigured()) return

    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.50',
        },
        body: JSON.stringify(valid),
      }),
    )
    const body = (await response.json()) as { ok: boolean; delivered: boolean; stored: boolean; message: string }

    expect(response.status).toBe(200)
    expect(body.ok).toBe(true)
    expect(body.delivered).toBe(false)
    expect(body.stored).toBe(true)
    expect(body.message).toContain('has not been sent')
  })

  it('rejects a honeypot submission', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.51',
        },
        body: JSON.stringify({ ...valid, website: 'https://spam.example' }),
      }),
    )
    expect(response.status).toBe(400)
  })
})

describe('rate limit', () => {
  it('blocks the sixth call inside the window', () => {
    const key = 'test-limit'
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited(key, 5, 60_000)).toBe(false)
    }
    expect(isRateLimited(key, 5, 60_000)).toBe(true)
  })
})

afterAll(async () => {
  try {
    const raw = await readFile(storePath, 'utf8')
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return
    const remaining = parsed.filter((entry) => {
      return !(entry && typeof entry === 'object' && 'email' in entry && entry.email === testEmail)
    })
    if (remaining.length === 0) {
      await writeFile(storePath, '[]\n', 'utf8')
    } else {
      await writeFile(storePath, JSON.stringify(remaining, null, 2), 'utf8')
    }
  } catch {
    // The file is only created when the persistence test runs.
  }
})
