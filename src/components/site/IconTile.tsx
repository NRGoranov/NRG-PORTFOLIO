import type { LucideIcon } from 'lucide-react'

export function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </span>
  )
}
