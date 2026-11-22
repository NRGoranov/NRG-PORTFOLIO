import { ConsultationForm } from '@/components/contact/ConsultationForm'
import { pageMetadata } from '@/lib/seo'
import { person } from '@/lib/site'
import { Mail, MapPin, Phone } from 'lucide-react'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Book a consultation with Nikolay Goranov about customer communication, CRM, websites, or custom automation.',
  path: '/contact',
})

const channels = [
  { label: 'Email', value: person.email, href: `mailto:${person.email}`, icon: Mail },
  { label: 'Phone', value: person.phone, href: person.phoneHref, icon: Phone },
  { label: 'Location', value: person.location, href: '', icon: MapPin },
]

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)] lg:items-start">
        <div id="consultation-form" className="scroll-mt-36 md:scroll-mt-24">
          <p className="text-sm font-medium text-primary">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Book a consultation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Share the business, the tools you want to keep, and the work that should take less time.
            The confirmation on this page tells you whether the request was emailed or only saved.
          </p>
          <div className="mt-8">
            <ConsultationForm />
          </div>
        </div>

        <aside className="rounded-2xl border border-border p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Direct contact</h2>
          <ul className="mt-5 space-y-4">
            {channels.map((channel) => (
              <li key={channel.label} className="flex gap-3">
                <channel.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted-foreground">{channel.label}</p>
                  {channel.href ? (
                    <a className="text-base hover:underline" href={channel.href}>
                      {channel.value}
                    </a>
                  ) : (
                    <p className="text-base">{channel.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
