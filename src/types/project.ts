import { z } from 'zod'

export const ProjectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  shortDescription: z.string().max(140, 'Short description must be 140 characters or less'),
  longDescription: z.string().optional(),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  year: z.number().min(2020).max(new Date().getFullYear()),
  role: z.string().optional(),
  stack: z.array(z.string()).min(1, 'At least one stack item is required'),
  liveUrl: z.string().url().optional(),
  sourceUrl: z.string().url().optional(),
  coverImage: z.string().min(1, 'Cover image is required'),
  gallery: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  highlightColor: z.string().optional(),
  metrics: z.object({
    users: z.string().optional(),
    stars: z.number().optional(),
    lighthousePerf: z.number().min(0).max(100).optional(),
  }).optional(),
})

export type Project = z.infer<typeof ProjectSchema>

export const validateProjects = (projects: unknown[]): Project[] => {
  return projects.map((project, index) => {
    try {
      return ProjectSchema.parse(project)
    } catch (error) {
      console.error(`Invalid project at index ${index}:`, error)
      throw new Error(`Project validation failed at index ${index}`)
    }
  })
}















