import Link from 'next/link'
import { ConsultLink } from '@/components/site/ConsultLink'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center">
      <div className="container max-w-xl py-20">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          That address is not available.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ConsultLink />
          <Button asChild variant="outline" className="h-12">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
