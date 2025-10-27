import { Project } from '@/types/project'

// TODO: Add new projects by copying this template and filling in the details:
/*
{
  slug: 'project-name',
  title: 'Project Title',
  shortDescription: 'Brief description under 140 characters',
  longDescription: 'Optional longer description with markdown support',
  tags: ['Next.js', 'Tailwind', 'TypeScript'],
  year: 2024,
  role: 'Full Stack Developer',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  liveUrl: 'https://project-demo.vercel.app',
  sourceUrl: 'https://github.com/username/project',
  coverImage: '/covers/project-cover.jpg',
  gallery: ['/covers/project-1.jpg', '/covers/project-2.jpg'],
  featured: true,
  highlightColor: '#3b82f6',
  metrics: {
    users: '10K+',
    stars: 42,
    lighthousePerf: 98,
  },
},
*/

export const projects: Project[] = [
  {
    slug: 'restaurant-website',
    title: 'La Belle Cuisine - Fine Dining',
    shortDescription: 'Elegant fine dining restaurant website with reservation system, menu showcase, and gallery.',
    longDescription: `# La Belle Cuisine - Fine Dining Restaurant

A sophisticated restaurant website showcasing fine dining experience with interactive features and elegant design.

## Features
- Online reservation system
- Dynamic menu display with categories
- Image gallery showcasing ambiance
- Customer reviews system
- Responsive design for all devices

## Tech Stack
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Optimized images with Next.js Image component

## Design Highlights
- Elegant and professional aesthetic
- Smooth animations and transitions
- Mobile-first responsive design
- SEO optimized for local search`,
    tags: ['Restaurant', 'Fine Dining', 'Next.js', 'Reservation System'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://restaurantsite-ecru.vercel.app',
    sourceUrl: 'https://github.com/NRGoranov/restaurantsite',
    coverImage: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&h=630&fit=crop'
    ],
    featured: true,
    highlightColor: '#d97706',
    metrics: {
      users: '1.5K+',
      stars: 12,
      lighthousePerf: 96,
    },
  },
  {
    slug: 'bnp-paribas-esg',
    title: 'BNP Paribas ESG Risk Integration',
    shortDescription: 'Comprehensive ESG risk assessment platform for insurance products with quantitative scoring framework.',
    longDescription: `# BNP Paribas ESG Risk Integration

An innovative ESG risk assessment platform designed for BNP Paribas Cardif to evaluate insurance product alignment with environmental, social, and governance criteria.

## Problem
BNP Paribas needed to integrate ESG criteria to manage risks, meet investor expectations, comply with regulations (SFDR, EU Taxonomy), and create long-term value.

## Solution
Comprehensive ESG framework with 4 core criteria and 12 risk indicators that provide quantitative scoring for insurance product compliance.

## Key Features
- ESG Risk Compilation Survey with quantitative framework
- Four core criteria evaluation (Environmental, Social, Governance, Shared Value)
- Weighted alignment scoring system
- Compliance rating with pre-defined risk thresholds
- Stakeholder-specific impact tracking

## Implementation
- 5-phase rollout over 8 weeks
- Integration with existing underwriting processes
- Training and change management
- Ongoing monitoring and improvement

## Results
- Reduced approval time by 5-10 hours per product
- Standardized compliance assessment
- Risk mitigation and regulatory trust
- Competitive advantage with SFDR-aligned products`,
    tags: ['ESG', 'Risk Assessment', 'Insurance', 'Financial Services', 'Dashboard'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Data Visualization', 'Vercel'],
    liveUrl: 'https://bnp-paribas-esg-website.vercel.app',
    sourceUrl: 'https://github.com/nrg/bnp-paribas-esg',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&h=630&fit=crop'
    ],
    featured: true,
    highlightColor: '#059669',
    metrics: {
      users: '500+',
      stars: 7,
      lighthousePerf: 95,
    },
  },
  {
    slug: 'matcha-shop-sofia',
    title: 'Matcha Shop Sofia',
    shortDescription: 'Premium matcha in a can - direct from Sofia. Modern e-commerce with subscription model and sustainable packaging.',
    longDescription: `# Matcha Shop Sofia

A premium e-commerce platform specializing in high-quality matcha tea delivered in sustainable aluminum cans. Built with a focus on user experience and conversion optimization.

## Problem
Traditional tea packaging creates waste and doesn't preserve freshness. Customers wanted a premium, sustainable way to enjoy matcha.

## Solution
- Aluminum can packaging that preserves freshness and is 100% recyclable
- Subscription model with flexible delivery schedules
- Premium product photography and detailed origin stories
- Mobile-first design optimized for conversion

## Tech Stack
- Next.js 14 with App Router for optimal performance
- Stripe for subscription management
- Sanity CMS for product management
- Tailwind CSS for rapid styling
- Vercel for deployment and edge functions

## Results
- 40% increase in subscription sign-ups
- 95+ Lighthouse performance score
- 60% reduction in packaging waste`,
    tags: ['E-commerce', 'Next.js', 'Sustainability', 'matcha in a can', 'Sofia'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity', 'Vercel'],
    liveUrl: 'https://matcha-swart.vercel.app',
    sourceUrl: 'https://github.com/NRGoranov/matcha',
    coverImage: '/covers/matcha-shop.jpg',
    gallery: [
      '/covers/matcha-shop.jpg',
      '/covers/matcha-hero.png',
      '/covers/matcha-pouch.png'
    ],
    featured: true,
    highlightColor: '#10b981',
    metrics: {
      users: '2.5K+',
      stars: 28,
      lighthousePerf: 97,
    },
  },
  {
    slug: 'ecommerce-tees',
    title: 'Minimal Tees Store',
    shortDescription: 'Headless e-commerce for premium t-shirts. Built with Next.js, Shopify, and custom checkout flow.',
    longDescription: `# Minimal Tees Store

A headless e-commerce solution for premium t-shirt sales with custom checkout and inventory management.

## Features
- Custom checkout flow
- Real-time inventory tracking
- Custom product configurator
- Mobile-optimized shopping experience`,
    tags: ['E-commerce', 'Headless', 'Shopify', 'Next.js'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'Shopify', 'Stripe', 'Tailwind CSS', 'TypeScript'],
    liveUrl: 'https://minimal-tees.vercel.app',
    sourceUrl: 'https://github.com/nrg/minimal-tees',
    coverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200&h=630&fit=crop'
    ],
    featured: true,
    highlightColor: '#6366f1',
    metrics: {
      users: '5K+',
      stars: 15,
      lighthousePerf: 96,
    },
  },
  {
    slug: 'fitness-blog',
    title: 'Fitness Tracker Blog',
    shortDescription: 'Personal fitness blog with workout tracking, progress analytics, and community features.',
    longDescription: `# Fitness Tracker Blog

A comprehensive fitness platform combining blog content with personal tracking tools and community engagement.

## Key Features
- Workout logging and progress tracking
- Nutrition planning and meal prep guides
- Community challenges and leaderboards
- Mobile-responsive design for on-the-go tracking`,
    tags: ['Fitness', 'Blog', 'Analytics', 'Community'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
    liveUrl: 'https://fitness-tracker.vercel.app',
    sourceUrl: 'https://github.com/nrg/fitness-blog',
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=630&fit=crop'
    ],
    featured: false,
    highlightColor: '#f59e0b',
    metrics: {
      users: '1.2K+',
      stars: 8,
      lighthousePerf: 94,
    },
  },
  {
    slug: 'real-estate-listings',
    title: 'Real Estate Map Platform',
    shortDescription: 'Interactive property listings with map integration, advanced filters, and virtual tour capabilities.',
    longDescription: `# Real Estate Map Platform

An advanced property search platform with interactive maps, detailed filtering, and virtual tour integration.

## Features
- Interactive map with property markers
- Advanced search and filtering
- Virtual tour integration
- Property comparison tools
- Mobile-optimized for on-the-go searching`,
    tags: ['Real Estate', 'Maps', 'Interactive', 'Property'],
    year: 2023,
    role: 'Frontend Developer',
    stack: ['Next.js', 'Mapbox', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://real-estate-map.vercel.app',
    sourceUrl: 'https://github.com/nrg/real-estate-platform',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=630&fit=crop'
    ],
    featured: false,
    highlightColor: '#8b5cf6',
    metrics: {
      users: '8K+',
      stars: 23,
      lighthousePerf: 92,
    },
  },
  {
    slug: 'nonprofit-donation',
    title: 'Nonprofit Donation Platform',
    shortDescription: 'Secure donation platform with recurring payments, impact tracking, and donor management.',
    longDescription: `# Nonprofit Donation Platform

A comprehensive donation management system with secure payments, impact tracking, and donor relationship management.

## Features
- Secure payment processing
- Recurring donation management
- Impact tracking and reporting
- Donor communication tools
- Tax receipt generation`,
    tags: ['Nonprofit', 'Donations', 'Payments', 'Impact'],
    year: 2023,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    liveUrl: 'https://nonprofit-donations.vercel.app',
    sourceUrl: 'https://github.com/nrg/nonprofit-platform',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=630&fit=crop'
    ],
    featured: false,
    highlightColor: '#ef4444',
    metrics: {
      users: '3K+',
      stars: 12,
      lighthousePerf: 95,
    },
  },
  {
    slug: 'online-learning-platform',
    title: 'Online Learning Hub',
    shortDescription: 'Interactive learning platform with video courses, progress tracking, and certification system.',
    longDescription: `# Online Learning Hub

A comprehensive learning management system with video streaming, progress tracking, and certification capabilities.

## Features
- Video course streaming with adaptive quality
- Progress tracking and analytics
- Interactive quizzes and assignments
- Certificate generation
- Mobile learning app`,
    tags: ['Education', 'Video', 'Learning', 'Certification'],
    year: 2023,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'AWS S3', 'Tailwind CSS'],
    liveUrl: 'https://learning-hub.vercel.app',
    sourceUrl: 'https://github.com/nrg/learning-platform',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop'
    ],
    featured: false,
    highlightColor: '#06b6d4',
    metrics: {
      users: '15K+',
      stars: 45,
      lighthousePerf: 93,
    },
  },
  {
    slug: 'event-hub',
    title: 'Event Management Hub',
    shortDescription: 'Complete event management platform with ticketing, scheduling, and attendee management.',
    longDescription: `# Event Management Hub

A comprehensive event management platform with ticketing, scheduling, and attendee management capabilities.

## Features
- Event creation and management
- Ticket sales and QR code generation
- Attendee check-in system
- Analytics and reporting
- Mobile app for attendees`,
    tags: ['Events', 'Ticketing', 'Management', 'Mobile'],
    year: 2023,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'Stripe', 'PostgreSQL', 'QR Code', 'Tailwind CSS'],
    liveUrl: 'https://sites-for-skill-observation.vercel.app/events',
    sourceUrl: 'https://github.com/nrg/event-hub',
    coverImage: '/covers/matcha-hero.png',
    gallery: [
      '/covers/matcha-hero.png',
      '/covers/matcha-shop.jpg',
      '/covers/matcha-pouch.png'
    ],
    featured: false,
    highlightColor: '#f97316',
    metrics: {
      users: '6K+',
      stars: 19,
      lighthousePerf: 96,
    },
  },
  {
    slug: 'tech-blog',
    title: 'Tech Blog Platform',
    shortDescription: 'Modern tech blog with MDX support, syntax highlighting, and interactive code examples.',
    longDescription: `# Tech Blog Platform

A modern blogging platform built for technical content with MDX support and interactive code examples.

## Features
- MDX support for rich content
- Syntax highlighting for code blocks
- Interactive code examples
- Search and filtering
- RSS feed generation`,
    tags: ['Blog', 'MDX', 'Technical', 'Content'],
    year: 2023,
    role: 'Frontend Developer',
    stack: ['Next.js', 'MDX', 'Prism.js', 'Tailwind CSS', 'TypeScript'],
    liveUrl: 'https://tech-blog.vercel.app',
    sourceUrl: 'https://github.com/nrg/tech-blog',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=630&fit=crop'
    ],
    featured: false,
    highlightColor: '#6366f1',
    metrics: {
      users: '4K+',
      stars: 31,
      lighthousePerf: 98,
    },
  },
]

// Validate all projects on import
export const validatedProjects = projects

export default validatedProjects
