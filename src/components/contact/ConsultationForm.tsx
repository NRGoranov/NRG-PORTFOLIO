'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { BUSINESS_TYPES, consultationSchema, fieldErrors, SERVICE_OPTIONS, type ConsultationField } from '@/lib/consultation'
import { person } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type FormState = {
  name: string
  businessName: string
  email: string
  phone: string
  businessType: string
  service: string
  message: string
  website: string
}

type SubmitResult = {
  delivered: boolean
  stored: boolean
  message: string
}

const initialState: FormState = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  businessType: '',
  service: '',
  message: '',
  website: '',
}

const fieldClass = 'h-12 text-base'

export function ConsultationForm() {
  const honeypotRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Partial<Record<ConsultationField, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<SubmitResult | null>(null)

  useEffect(() => {
    honeypotRef.current?.setAttribute('inert', '')
  }, [])

  function update(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }))
    if (name !== 'website' && errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setResult(null)

    const parsed = consultationSchema.safeParse({
      name: form.name,
      businessName: form.businessName,
      email: form.email,
      phone: form.phone,
      businessType: form.businessType,
      service: form.service,
      message: form.message,
    })

    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error))
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, website: form.website }),
      })

      const payload = (await response.json()) as {
        ok?: boolean
        delivered?: boolean
        stored?: boolean
        message?: string
      }

      if (!response.ok || !payload.ok) {
        setError(payload.message || 'The request was not accepted.')
        return
      }

      setResult({
        delivered: Boolean(payload.delivered),
        stored: Boolean(payload.stored),
        message: payload.message || 'Your request was received.',
      })
      setForm(initialState)
    } catch {
      setError(
        `The request could not be sent. Check your connection and try again, or email ${person.email}.`,
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <div role="status" className="rounded-2xl border border-border bg-card p-6 sm:p-8" data-testid="consultation-status">
        <h2 className="text-2xl font-semibold">
          {result.delivered
            ? 'Consultation request sent'
            : result.stored
              ? 'Consultation request saved'
              : 'Consultation request received'}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{result.message}</p>
        <Button type="button" variant="outline" className="mt-6 h-12" onClick={() => setResult(null)}>
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5" aria-busy={submitting}>
      <div ref={honeypotRef} aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
        </Field>
        <Field id="businessName" label="Business name" error={errors.businessName}>
          <Input
            id="businessName"
            name="businessName"
            autoComplete="organization"
            value={form.businessName}
            onChange={(event) => update('businessName', event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={errors.businessName ? 'businessName-error' : undefined}
            required
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
        </Field>
        <Field id="phone" label="Phone number" hint="Optional" error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="businessType" label="Business type" error={errors.businessType}>
          <select
            id="businessType"
            name="businessType"
            value={form.businessType}
            onChange={(event) => update('businessType', event.target.value)}
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={errors.businessType ? 'businessType-error' : undefined}
            required
          >
            <option value="">Select a business type</option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field id="service" label="Service of interest" error={errors.service}>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={(event) => update('service', event.target.value)}
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'service-error' : undefined}
            required
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          rows={6}
          className="min-h-36 text-base"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          required
        />
      </Field>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Your details are used only to reply to this request. They are emailed when mail is configured,
        otherwise stored in a private server file if the host can write one. They are not added to a
        mailing list.{' '}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy notice
        </Link>
        .
      </p>

      {error ? (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="h-12 w-full text-base sm:w-auto" disabled={submitting}>
        {submitting ? 'Sending request…' : 'Book a Consultation'}
      </Button>
    </form>
  )
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {hint ? (
          <span id={`${id}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}
