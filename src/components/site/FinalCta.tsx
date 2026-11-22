import { ConsultLink } from '@/components/site/ConsultLink'

export function FinalCta({ title, text }: { title: string; text: string }) {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="container">
        <div className="rounded-2xl border border-border bg-secondary px-6 py-10 sm:px-10 sm:py-14">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance">{title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{text}</p>
          <div className="mt-8">
            <ConsultLink />
          </div>
        </div>
      </div>
    </section>
  )
}
