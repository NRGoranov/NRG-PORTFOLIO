import type { LucideIcon } from 'lucide-react'
import { Award, Code, Users, Zap } from 'lucide-react'

export const story = [
  'My journey in web development began with a simple curiosity about how websites work. What started as a hobby became the work I have kept learning for five years.',
  'I build modern web applications with Next.js, TypeScript, and React. The useful version of that work is a site or a workflow a business can actually run, not a stack list.',
  'The projects on this site include hospitality catalogues, restaurant websites, brand sites, and earlier product builds. Each one is listed with the description already published for that project.',
  'When I am not building, I train, compete, and help friends with technical and practical problems. NRG is the same habit applied to businesses: reduce repeated work and make communication clearer.',
]

export const experience = [
  {
    year: '2024',
    title: 'Full-Stack Developer',
    company: 'Freelance & Personal Projects',
    description: 'Building modern web applications and exploring current technologies through personal projects.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Node.js'],
  },
  {
    year: '2022-2023',
    title: 'Web Developer',
    company: 'Freelance',
    description: 'Developing responsive websites and web applications for client work and personal projects.',
    technologies: ['React', 'JavaScript', 'CSS3', 'MongoDB'],
  },
  {
    year: '2019-2021',
    title: 'Frontend Developer',
    company: 'Learning & Self-Development',
    description: 'Learning modern web technologies and building projects to learn the craft.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
  },
]

export const skillCategories = [
  {
    category: 'Frontend',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    description: 'Interfaces, responsive layout, and the public sites guests actually use.',
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    description: 'Server routes, data, and the forms that have to arrive somewhere real.',
  },
  {
    category: 'Tools & Deployment',
    skills: ['Git', 'Vercel', 'Docker', 'AWS', 'Figma'],
    description: 'How the work is designed, shipped, and kept in version control.',
  },
  {
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Go', 'C#', 'SQL', 'HTML & CSS'],
    description: 'Languages used across the projects and earlier study.',
  },
]

export const approach: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Clear structure',
    description: 'Code and content should be readable by the next person who has to change them.',
    icon: Code,
  },
  {
    title: 'Performance',
    description: 'Pages should load quickly, stay usable on a phone, and avoid animation that gets in the way.',
    icon: Zap,
  },
  {
    title: 'Direct collaboration',
    description: 'I would rather confirm how the business works than guess from a brief.',
    icon: Users,
  },
  {
    title: 'Finish the path',
    description: 'A form, a menu, or a catalogue is done when a visitor can complete the real task.',
    icon: Award,
  },
]

export const selectedProjectSlugs = [
  'clever-solution',
  'restaurant-website',
  'responsive-restaurant-website',
  'matcha-shop-sofia',
  'gola-handcrafted',
  'bnp-paribas-esg',
]
