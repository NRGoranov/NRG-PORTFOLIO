import { z } from 'zod'

export const SERVICE_OPTIONS = [
  'Standard CRM',
  'Autonomous Platform',
  'Website Development',
  'Custom Automation',
  'Not Sure Yet',
] as const

export const BUSINESS_TYPES = [
  'Restaurant',
  'Hospitality',
  'Growing brand',
  'Service business',
  'Other',
] as const

export const consultationSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(120, 'Name is too long.'),
  businessName: z
    .string()
    .trim()
    .min(2, 'Enter your business name.')
    .max(160, 'Business name is too long.'),
  email: z.string().trim().email('Enter a valid email address.').max(200, 'Email is too long.'),
  phone: z
    .string()
    .trim()
    .max(40, 'Phone number is too long.')
    .refine(
      (value) => value.length === 0 || /^[+0-9().\-\s]{6,40}$/.test(value),
      'Enter a valid phone number or leave it blank.',
    ),
  businessType: z.enum(BUSINESS_TYPES, {
    errorMap: () => ({ message: 'Select a business type.' }),
  }),
  service: z.enum(SERVICE_OPTIONS, {
    errorMap: () => ({ message: 'Select a service.' }),
  }),
  message: z
    .string()
    .trim()
    .min(20, 'Add a few sentences about what you need.')
    .max(5000, 'Message is too long.'),
})

export type ConsultationInput = z.infer<typeof consultationSchema>

export type ConsultationField = keyof ConsultationInput

export function fieldErrors(error: z.ZodError): Partial<Record<ConsultationField, string>> {
  const errors: Partial<Record<ConsultationField, string>> = {}

  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !(key in errors)) {
      errors[key as ConsultationField] = issue.message
    }
  }

  return errors
}
