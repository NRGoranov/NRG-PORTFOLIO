'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Code, Zap, Award, Users, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import { Project } from '@/types/project'

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])

  useEffect(() => {
    setFeaturedProjects(projects.filter(project => project.featured))
  }, [])

  const stats = [
    { label: 'Projects Built', value: '30+' },
    { label: 'Years Learning', value: '5' },
    { label: 'Technologies', value: '20+' },
    { label: 'Passion Level', value: '100%' },
  ]

  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      description: 'Modern UI/UX development'
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
      description: 'Server-side development'
    },
    {
      category: 'Tools & Deployment',
      skills: ['Git', 'Vercel', 'Docker', 'AWS', 'Figma'],
      description: 'Development workflow'
    },
    {
      category: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3'],
      description: 'Programming languages'
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Personal Brand */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">NRG</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1" />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-5xl lg:text-7xl font-bold tracking-tight"
                  >
                    <span className="block">Nikolay</span>
                    <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                      Goranov
                    </span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="space-y-2"
                  >
                  <h2 className="text-2xl lg:text-3xl text-muted-foreground font-light">
                    Full-Stack Developer
                  </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                      Crafting exceptional digital experiences with modern technologies. 
                      I transform complex ideas into elegant, scalable solutions through continuous learning and passion.
                    </p>
                  </motion.div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button asChild size="lg" className="text-base group">
                    <Link href="/projects">
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-base">
                    <Link href="/contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Get In Touch
                    </Link>
                  </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm text-muted-foreground">Follow me:</span>
                  <div className="flex gap-3">
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10">
                      <Link href="https://github.com/NRGoranov" target="_blank">
                        <Github className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10">
                      <Link href="https://linkedin.com/in/nrgoranov" target="_blank">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  {/* Floating cards */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 bg-card border rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Full-Stack</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-4 -left-4 bg-card border rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold">Fast & Modern</span>
                    </div>
                  </motion.div>

                  {/* Main visual */}
                  <div className="relative bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 border shadow-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 bg-red-500 rounded-full" />
                        <div className="h-3 w-3 bg-yellow-500 rounded-full" />
                        <div className="h-3 w-3 bg-green-500 rounded-full" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="h-4 bg-primary/20 rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-primary/10 rounded w-5/6" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="h-3 bg-primary/30 rounded w-full" />
                          <div className="h-3 bg-muted/50 rounded w-2/3" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-primary/20 rounded w-full" />
                          <div className="h-3 bg-muted/30 rounded w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to build modern web applications
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 hover:bg-card/70 transition-colors"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: (index * 0.1) + (skillIndex * 0.05) 
                        }}
                        viewport={{ once: true }}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my most impactful projects and innovative solutions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 h-full">
                  <Link href={`/projects/${project.slug}`}>
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/90 text-sm line-clamp-2 mb-3">
                          {project.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's collaborate to bring your vision to life with cutting-edge technology and exceptional design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/about">
                  Learn More About Me
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}