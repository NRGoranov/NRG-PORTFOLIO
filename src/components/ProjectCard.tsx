'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, Users, Zap } from 'lucide-react'
import { Project } from '@/types/project'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative aspect-[4/3] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                Featured
              </Badge>
            </div>
          )}
          {project.metrics?.lighthousePerf && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-background/90">
                <Zap className="w-3 h-3 mr-1" />
                {project.metrics.lighthousePerf}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <span className="text-sm text-muted-foreground font-mono">
                {project.year}
              </span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>

            {project.metrics && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {project.metrics.users && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {project.metrics.users}
                  </div>
                )}
                {project.metrics.stars && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {project.metrics.stars}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex w-full gap-2">
            {project.liveUrl && (
              <Button asChild variant="default" size="sm" className="flex-1">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.sourceUrl && (
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Link>
              </Button>
            )}
            {!project.liveUrl && !project.sourceUrl && (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/projects/${project.slug}`}>
                  View Details
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}












