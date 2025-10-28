'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code, Zap, Award, Users, Github, Linkedin, Mail, Download } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  const experience = [
    {
      year: '2024',
      title: 'Full-Stack Developer',
      company: 'Freelance & Personal Projects',
      description: 'Building modern web applications and exploring cutting-edge technologies through personal projects.',
      technologies: ['Next.js', 'TypeScript', 'React', 'Node.js']
    },
    {
      year: '2022-2023',
      title: 'Web Developer',
      company: 'Freelance',
      description: 'Developing responsive websites and web applications for various clients and personal projects.',
      technologies: ['React', 'JavaScript', 'CSS3', 'MongoDB']
    },
    {
      year: '2020-2022',
      title: 'Frontend Developer',
      company: 'Learning & Self-Development',
      description: 'Learning modern web technologies and building projects to master the craft of web development.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git']
    }
  ]

  const values = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code that stands the test of time.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing every aspect for speed, efficiency, and exceptional user experience.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with teams to deliver solutions that exceed expectations.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for the highest quality in every project and continuous learning.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-3xl">NRG</span>
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="h-3 w-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  About
                  <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                    Nikolay Goranov
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  A passionate full-stack developer with 5 years of experience creating 
                  exceptional digital experiences. I specialize in modern web technologies 
                  and love turning complex problems into elegant solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Let's Connect
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Story</h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  My journey in web development began with a simple curiosity about how websites work. 
                  What started as a hobby quickly became a passion that has driven my learning and growth for 5 years.
                </p>
                
                <p>
                  I specialize in creating modern, scalable web applications using cutting-edge technologies 
                  like Next.js, TypeScript, and React. My approach combines technical excellence with 
                  user-centered design to deliver solutions that not only meet requirements but exceed expectations.
                </p>
                
                <p>
                  Throughout my journey, I've had the privilege of working on diverse projects and helping 
                  friends with their own challenges. Each project has taught me something new and 
                  reinforced my belief that great software is built through continuous learning, 
                  attention to detail, and genuine passion for the craft.
                </p>
                
                <p>
                  When I'm not coding, you'll find me pursuing my passion for fitness, attending competitions, 
                  and expanding my network through my expertise in physical training. I love helping friends 
                  with their own projects and problems, whether they're technical or personal. I believe in 
                  the power of technology to solve real-world problems and make a positive impact, both online and off.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A journey of growth, learning, and delivering exceptional results
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold">{job.year}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <span className="text-sm text-muted-foreground">{job.year}</span>
                      </div>
                      <p className="text-primary font-medium">{job.company}</p>
                      <p className="text-muted-foreground">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {index < experience.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-8 bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Value</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide my work and approach to development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}