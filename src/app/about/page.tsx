'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Zap, Globe, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const skills = [
  { name: 'Frontend', icon: Palette, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { name: 'Backend', icon: Code, items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma'] },
  { name: 'DevOps', icon: Zap, items: ['Vercel', 'Docker', 'AWS', 'GitHub Actions', 'CI/CD'] },
  { name: 'Design', icon: Globe, items: ['Figma', 'Adobe Creative Suite', 'Responsive Design', 'UI/UX'] },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/nrg', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/nrg', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/nrg', icon: Twitter },
  { name: 'Email', href: 'mailto:hello@nrg.dev', icon: Mail },
]

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="container max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm a passionate web developer who loves building modern, accessible, 
            and performant web experiences.
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  I'm a full-stack developer with a passion for creating exceptional web experiences. 
                  With a background in both design and development, I bring a unique perspective to 
                  every project I work on.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  I specialize in modern web technologies like Next.js, TypeScript, and React, 
                  but I'm always exploring new tools and frameworks. I believe in writing clean, 
                  maintainable code and creating user experiences that are both beautiful and functional.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <Card key={skill.name}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <skill.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. 
            Feel free to reach out!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <Button key={social.name} asChild variant="outline" size="lg">
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-4 w-4 mr-2" />
                  {social.name}
                </a>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

