import { FinalCta } from '@/components/site/FinalCta'
import { IconTile } from '@/components/site/IconTile'
import { offers } from '@/content/offer'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Solutions',
  description:
    'Standard CRM, a planned restaurant platform, and optional websites. See what is available now and what is still being built.',
  path: '/solutions',
})

export default function SolutionsPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary">Solutions</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Communication, operations, and the website in between.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              NRG helps restaurants and other service businesses cut repeated work and answer customers
              more consistently. Custom automation that does not fit these three can be discussed on the
              consultation form.
            </p>
          </div>
        </div>
      </section>

      {offers.map((offer) => (
        <section key={offer.id} id={offer.id} className="scroll-mt-36 border-t border-border py-16 sm:py-20 md:scroll-mt-24">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-start justify-between gap-4">
                <IconTile icon={offer.icon} />
                <p className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {offer.statusLabel}
                </p>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">{offer.name}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                {offer.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {offer.features.map((feature) => (
                <li key={feature.title} className="rounded-2xl border border-border p-5">
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <FinalCta
        title="Not sure which one fits?"
        text="Choose Not Sure Yet on the form. The consultation is there to sort that out."
      />
    </>
  )
}
