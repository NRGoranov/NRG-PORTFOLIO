import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Star, Users, Zap, Calendar } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { projects } from '@/data/projects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url: `/projects/${project.slug}`,
      images: [{ url: project.coverImage }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: project.title,
      description: project.shortDescription,
      images: [project.coverImage],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  
  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex(p => p.slug === project.slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <div className="py-20">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            {project.featured && (
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                  Featured
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {project.year}
              </div>
              {project.role && (
                <Badge variant="outline">{project.role}</Badge>
              )}
              {project.metrics?.lighthousePerf && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  Lighthouse: {project.metrics.lighthousePerf}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Button asChild size="lg">
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {project.sourceUrl && (
                <Button asChild variant="outline" size="lg">
                  <Link href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {project.longDescription && (
              <Card>
                <CardHeader>
                  <CardTitle>About This Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:list-disc prose-ol:list-decimal prose-li:my-2">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {project.longDescription}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Metrics */}
            {project.metrics && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.metrics.users && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{project.metrics.users} users</span>
                    </div>
                  )}
                  {project.metrics.stars && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{project.metrics.stars} GitHub stars</span>
                    </div>
                  )}
                  {project.metrics.lighthousePerf && (
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{project.metrics.lighthousePerf} Lighthouse score</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>More Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {prevProject && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Previous</p>
                    <Button asChild variant="outline" size="sm" className="w-full justify-start">
                      <Link href={`/projects/${prevProject.slug}`}>
                        {prevProject.title}
                      </Link>
                    </Button>
                  </div>
                )}
                {nextProject && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Next</p>
                    <Button asChild variant="outline" size="sm" className="w-full justify-start">
                      <Link href={`/projects/${nextProject.slug}`}>
                        {nextProject.title}
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



