import { ConsultLink } from '@/components/site/ConsultLink'
import { FaqList } from '@/components/site/FaqList'
import { FinalCta } from '@/components/site/FinalCta'
import { IconTile } from '@/components/site/IconTile'
import { JsonLd } from '@/components/site/JsonLd'
import { SectionHeading } from '@/components/site/SectionHeading'
import { offers, principles, problems, steps } from '@/content/offer'
import { pageMetadata } from '@/lib/seo'
import { person, SITE_URL } from '@/lib/site'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'NRG — Automate the busywork. Focus on your business.',
  description:
    'AI-powered customer communication, CRM, and automation for restaurants and growing businesses. Book a consultation with Nikolay Goranov.',
  path: '/',
  absolute: true,
})

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'NRG',
          url: SITE_URL,
          description:
            'Customer communication, CRM implementation, and websites for restaurants, hospitality, and service businesses.',
          email: person.email,
          telephone: '+359897338635',
          areaServed: 'Bulgaria',
          founder: {
            '@type': 'Person',
            name: person.name,
            url: `${SITE_URL}/about`,
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sofia',
            addressCountry: 'BG',
          },
        }}
      />

      <section className="border-b border-border">
        <div className="container py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary">NRG · Sofia</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Automate the busywork. Focus on your business.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              AI-powered customer communication, CRM, and automation solutions for restaurants and
              growing businesses. Keep your existing systems or expand into a more connected operation.
            </p>
            <div className="mt-8">
              <ConsultLink />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              For restaurants, hospitality, and service businesses.{' '}
              <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
                About {person.name}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="problems-heading">
        <div className="container">
          <SectionHeading id="problems-heading" title="Problems we solve">
            The work usually starts in the same places: messages nobody answered, and information that
            never made it into one record.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <article key={problem.title} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                <IconTile icon={problem.icon} />
                <h3 className="mt-4 text-lg font-semibold">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20 lg:py-24" aria-labelledby="solutions-heading">
        <div className="container">
          <SectionHeading id="solutions-heading" title="Solutions">
            Three ways to work together. The CRM product is still being built. Website work can start now.
            A new website is never required.
          </SectionHeading>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {offers.map((offer) => (
              <article key={offer.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <IconTile icon={offer.icon} />
                  <p className="text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {offer.statusLabel}
                  </p>
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  <Link href={`/solutions#${offer.id}`} className="underline-offset-4 hover:underline">
                    {offer.name}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{offer.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20 lg:py-24" aria-labelledby="process-heading">
        <div className="container">
          <SectionHeading id="process-heading" title="How it works" />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border p-5 sm:p-6">
                <p className="font-mono text-sm text-primary">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20 lg:py-24" aria-labelledby="principles-heading">
        <div className="container">
          <SectionHeading id="principles-heading" title="Why NRG">
            The practice is small on purpose. The point is a system you can run, with a person you can reach.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-border p-5 sm:p-6">
                <IconTile icon={principle.icon} />
                <h3 className="mt-4 text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20 lg:py-24" aria-labelledby="faq-heading">
        <div className="container">
          <SectionHeading id="faq-heading" title="Questions" />
          <div className="mt-10 max-w-3xl">
            <FaqList />
          </div>
        </div>
      </section>

      <FinalCta
        title="Book a consultation."
        text="Tell me how customers reach you today and which tools you want to keep."
      />
    </>
  )
}
