import type { ReactNode } from 'react'

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p> : null}
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</p>
      ) : null}
    </div>
  )
}
