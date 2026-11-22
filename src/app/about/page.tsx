import Image from 'next/image'
import Link from 'next/link'
import { Github, Instagram, Linkedin } from 'lucide-react'
import { FinalCta } from '@/components/site/FinalCta'
import { IconTile } from '@/components/site/IconTile'
import { JsonLd } from '@/components/site/JsonLd'
import { SectionHeading } from '@/components/site/SectionHeading'
import { approach, experience, selectedProjectSlugs, skillCategories, story } from '@/content/profile'
import { projects } from '@/data/projects'
import { pageMetadata } from '@/lib/seo'
import { person, SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Nikolay Goranov is a full-stack developer in Sofia. See the projects, tools, and experience behind NRG.',
  path: '/about',
})

const selectedProjects = selectedProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project))

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: person.name,
          url: `${SITE_URL}/about`,
          jobTitle: 'Full-Stack Developer',
          email: person.email,
          telephone: '+359897338635',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sofia',
            addressCountry: 'BG',
          },
          sameAs: [person.github, person.linkedin, person.instagram],
        }}
      />

      <section className="border-b border-border">
        <div className="container py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary">About</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {person.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Full-stack developer in Sofia. NRG is my practice for restaurants, hospitality, and other
              service businesses that want less repeated admin and clearer customer communication.
            </p>
            <dl className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted-foreground">Hackathons completed</dt>
                <dd className="mt-1 text-2xl font-semibold">4</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Projects on this site</dt>
                <dd className="mt-1 text-2xl font-semibold">{projects.length}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Years learning</dt>
                <dd className="mt-1 text-2xl font-semibold">5</dd>
              </div>
            </dl>
            <ul className="mt-8 flex gap-2">
              {[
                { name: 'GitHub', href: person.github, icon: Github },
                { name: 'LinkedIn', href: person.linkedin, icon: Linkedin },
                { name: 'Instagram', href: person.instagram, icon: Instagram },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <link.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="journey-heading">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading id="journey-heading" title="Journey" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <ol className="space-y-8">
            {experience.map((job) => (
              <li key={job.year} className="border-l border-border pl-5">
                <p className="text-sm font-medium text-primary">{job.year}</p>
                <h3 className="mt-1 text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.description}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <li key={tech} className="rounded-full border border-border px-3 py-1 text-xs">
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20" aria-labelledby="expertise-heading">
        <div className="container">
          <SectionHeading id="expertise-heading" title="Technical expertise">
            Tools I use to design, build, and ship web software.
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {skillCategories.map((category) => (
              <article key={category.category} className="rounded-2xl border border-border p-5 sm:p-6">
                <h3 className="text-lg font-semibold">{category.category}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20" aria-labelledby="projects-heading">
        <div className="container">
          <SectionHeading id="projects-heading" title="Selected projects">
            Published work from this site. Descriptions are the ones already written for each project.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-2xl border border-border bg-card">
                <Link href={`/projects/${project.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <div className="relative aspect-[16/10] bg-secondary">
                    <Image
                      src={project.coverImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold group-hover:underline">{project.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.year} · {project.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.shortDescription}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm">
            <Link href="/projects" className="underline underline-offset-4 hover:text-primary">
              All projects
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20" aria-labelledby="approach-heading">
        <div className="container">
          <SectionHeading id="approach-heading" title="Development approach" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border p-5">
                <IconTile icon={item.icon} />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="If the work fits, start with a conversation."
        text="Bring the tools you already use and the task that wastes the most time."
      />
    </>
  )
}
