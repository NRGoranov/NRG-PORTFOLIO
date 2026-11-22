import Link from 'next/link'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { navigation, person } from '@/lib/site'

const socialLinks = [
  { name: 'GitHub', href: person.github, icon: Github },
  { name: 'LinkedIn', href: person.linkedin, icon: Linkedin },
  { name: 'Instagram', href: person.instagram, icon: Instagram },
  { name: 'Email', href: `mailto:${person.email}`, icon: Mail },
]

const moreLinks = [
  { name: 'Projects', href: '/projects' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Legal notice', href: '/legal' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-md" aria-label="NRG home">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                NRG
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Practical automation, customer communication, and websites for restaurants and other
              service businesses. Operated by {person.name} in Sofia.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Explore</h2>
            <ul className="space-y-2">
              {[...navigation, ...moreLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Contact</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a className="hover:text-foreground hover:underline" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              </li>
              <li>
                <a className="hover:text-foreground hover:underline" href={person.phoneHref}>
                  {person.phone}
                </a>
              </li>
              <li>{person.location}</li>
            </ul>
            <div className="flex gap-2 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <social.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {person.name}. All rights reserved.</p>
          <p>NRG · Sofia, Bulgaria</p>
        </div>
      </div>
    </footer>
  )
}
