import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CONSULT_HREF, CONSULT_LABEL } from '@/lib/site'
import { cn } from '@/lib/utils'

export function ConsultLink({
  className,
  size = 'lg',
}: {
  className?: string
  size?: 'default' | 'lg' | 'sm'
}) {
  return (
    <Button asChild size={size} className={cn('h-12 px-5 text-base', className)}>
      <Link href={CONSULT_HREF}>{CONSULT_LABEL}</Link>
    </Button>
  )
}
