'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Github, Linkedin, Twitter, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const contactMethods = [
  {
    name: 'Email',
    description: 'Get in touch directly',
    icon: Mail,
    href: 'mailto:hello@nrg.dev',
    label: 'hello@nrg.dev'
  },
  {
    name: 'LinkedIn',
    description: 'Professional networking',
    icon: Linkedin,
    href: 'https://linkedin.com/in/nrg',
    label: 'linkedin.com/in/nrg'
  },
  {
    name: 'GitHub',
    description: 'View my code',
    icon: Github,
    href: 'https://github.com/nrg',
    label: 'github.com/nrg'
  },
  {
    name: 'Twitter',
    description: 'Follow for updates',
    icon: Twitter,
    href: 'https://twitter.com/nrg',
    label: '@nrg'
  }
]

const quickInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sofia, Bulgaria'
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours'
  }
]

export default function ContactPage() {
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
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Want to collaborate? 
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Contact Methods</h2>
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <Card key={method.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{method.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {method.description}
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <a href={method.href} target="_blank" rel="noopener noreferrer">
                            {method.label}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-3">
                    <info.icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{info.label}</p>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What's this about?" required />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

