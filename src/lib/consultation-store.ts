import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import type { ConsultationInput } from '@/lib/consultation'

export type StoredConsultation = ConsultationInput & {
  id: string
  createdAt: string
}

const filePath = path.join(process.cwd(), 'data', 'consultations.json')

/**
 * Private server file. It is gitignored and is not exposed as a page.
 * Returns false when the host cannot write, which is common on serverless disks.
 */
export async function saveConsultation(entry: ConsultationInput): Promise<boolean> {
  try {
    await mkdir(path.dirname(filePath), { recursive: true })

    let existing: StoredConsultation[] = []
    try {
      const raw = await readFile(filePath, 'utf8')
      const parsed: unknown = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        existing = parsed as StoredConsultation[]
      }
    } catch {
      existing = []
    }

    existing.push({
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    })

    await writeFile(filePath, JSON.stringify(existing, null, 2), { encoding: 'utf8', mode: 0o600 })
    return true
  } catch {
    return false
  }
}
