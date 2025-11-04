import { Project } from '@/types/project'

// Portfolio Projects Data
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

A sophisticated restaurant website that captures the essence of fine dining through elegant design and seamless user experience. Built to showcase culinary excellence while making reservations effortless.

## Problem
Fine dining restaurants need an online presence that reflects their elegance and sophistication while providing essential functionality like reservations and menu browsing. Traditional restaurant websites often lack the polish and user experience that matches the dining experience.

## Solution
A beautifully crafted website that combines elegant aesthetics with practical features, creating a digital experience that mirrors the restaurant's commitment to excellence.

## Key Features
- **Online Reservation System**: Seamless booking experience with date/time selection and guest count management
- **Dynamic Menu Display**: Organized menu sections with categories, descriptions, and pricing
- **Image Gallery**: Stunning photography showcasing dishes, ambiance, and special events
- **Customer Reviews System**: Social proof with authentic reviews and ratings
- **Chef's Story**: Dedicated section highlighting culinary expertise and philosophy
- **Location & Hours**: Clear contact information with interactive map integration
- **Special Events**: Showcase private dining options and special occasions

## Tech Stack
- Next.js 14 with App Router for optimal performance
- TypeScript for type safety and maintainability
- Tailwind CSS for elegant, responsive styling
- Next.js Image component for optimized photography
- Form handling for reservations and inquiries

## Design Highlights
- **Elegant Aesthetic**: Sophisticated color palette and typography that reflects fine dining
- **Smooth Animations**: Subtle transitions and hover effects that enhance user experience
- **Mobile-First Design**: Responsive layout that works beautifully on all devices
- **SEO Optimized**: Local SEO strategies for restaurant discovery
- **Performance**: Optimized images and code splitting for fast load times

## Results
- Increased reservation bookings
- Improved user engagement
- Better mobile experience
- Enhanced local search visibility
- Professional online presence`,
    tags: ['Restaurant', 'Fine Dining', 'Next.js', 'Reservation System'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://restaurantsite-ecru.vercel.app',
    sourceUrl: 'https://github.com/NRGoranov/restaurantsite',
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop'
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
    coverImage: '/covers/matcha-pouch.png',
    gallery: [
      '/covers/matcha-pouch.png',
      '/covers/matcha-shop.jpg',
      '/covers/matcha-hero.png'
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
    slug: 'react-real-estate-platform',
    title: 'React Real Estate Platform',
    shortDescription: 'Interactive property listings platform with advanced search, map integration, and market analytics built with React and vanilla JavaScript.',
    longDescription: `# React Real Estate Platform

A comprehensive real estate platform built with React and vanilla JavaScript, featuring interactive property search, map integration, and market analytics.

## Problem
Real estate websites often lack intuitive search interfaces and comprehensive property information. Users need a seamless way to find properties that match their exact requirements.

## Solution
A feature-rich platform with advanced search capabilities, interactive maps, property comparison tools, and real-time market insights.

## Key Features
- **Advanced Search Interface**: Location autocomplete, dual-range price slider, property type filters, and bedroom/bathroom selectors
- **Interactive Map Integration**: Leaflet.js map with property markers, clustering, and area-based search
- **Property Comparison**: Side-by-side comparison of up to 3 properties
- **Favorites System**: Save properties to favorites with local storage persistence
- **Market Analytics**: Real-time market statistics with ECharts visualizations
- **Virtual Tour Integration**: 360° property tour capabilities
- **Mortgage Calculator**: Interactive payment estimator
- **Responsive Design**: Mobile-first approach with touch-optimized interactions

## Tech Stack
- React for component architecture
- Vanilla JavaScript for core functionality
- Anime.js for smooth animations
- Splide.js for image carousels
- ECharts for data visualization
- p5.js for creative background effects
- Leaflet.js for map integration

## Design Highlights
- Sophisticated color palette (charcoal, gold, green accents)
- Elegant typography with Playfair Display and Inter fonts
- Smooth scroll animations and transitions
- Particle background effects
- Professional property cards with hover effects

## Interactive Features
- Real-time search filtering
- Property detail modals
- Favorites and recently viewed tracking
- Multi-step contact forms with validation
- Blog section with article filtering`,
    tags: ['Real Estate', 'React', 'Interactive', 'Maps', 'Property Search'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['React', 'JavaScript', 'Leaflet.js', 'Anime.js', 'ECharts', 'p5.js'],
    liveUrl: '#',
    sourceUrl: '#',
    coverImage: '/covers/real-estate.jpg',
    gallery: [
      '/covers/real-estate.jpg',
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
    title: 'Hope Foundation - Nonprofit Website',
    shortDescription: 'Comprehensive nonprofit organization website with donation system, volunteer registration, and program showcase.',
    longDescription: `# Hope Foundation - Nonprofit Website

A comprehensive nonprofit organization website designed to drive donations, volunteer engagement, and community awareness. Built with modern web technologies to maximize impact and user engagement.

## Problem
Nonprofit organizations struggle to effectively communicate their mission, facilitate donations, and engage volunteers through traditional websites. They need a platform that builds trust and makes it easy for supporters to take action.

## Solution
A purpose-driven website that combines compelling storytelling with functional donation and volunteer registration systems, creating a seamless experience for supporters to contribute to the cause.

## Key Features
- **Donation Platform**: Flexible donation system with preset amounts ($25, $50, $100, $250, $500) and custom donation options
- **Volunteer Application System**: Comprehensive volunteer registration with interest areas, availability, and skills matching
- **Program Showcase**: Detailed program pages highlighting impact and outcomes with compelling imagery
- **Event Management**: Event listings with registration, calendar integration, and RSVP functionality
- **Contact Forms**: Multiple inquiry forms for donations, partnerships, and general contact
- **Impact Stories**: Testimonials and success stories to build trust and demonstrate impact

## Tech Stack
- Next.js 14 with App Router for optimal performance and SEO
- TypeScript for type safety and maintainability
- Tailwind CSS for elegant, responsive styling
- Lucide React for consistent iconography
- Form validation and submission handling

## Design Highlights
- **Clean, Professional Aesthetic**: Trust-building design that reflects organizational values
- **User-Friendly Navigation**: Intuitive structure that guides users to key actions
- **Accessible Form Design**: WCAG-compliant forms with clear labels and error handling
- **SEO Optimized**: Structured data, meta tags, and semantic HTML for better discoverability
- **Mobile-First**: Responsive design ensuring accessibility on all devices

## Results
- Increased donation conversion rates
- Higher volunteer sign-ups
- Improved user engagement
- Better mobile experience
- Enhanced SEO visibility`,
    tags: ['Nonprofit', 'Donations', 'Volunteers', 'Community'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://nonprofit-website-five.vercel.app',
    sourceUrl: 'https://github.com/NRGoranov/nonprofit-website',
    coverImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1505027496617-cfd09d93f672?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=630&fit=crop'
    ],
    featured: false,
    highlightColor: '#10b981',
    metrics: {
      users: '3K+',
      stars: 12,
      lighthousePerf: 95,
    },
  },
  {
    slug: 'responsive-restaurant-website',
    title: 'Responsive Restaurant Website',
    shortDescription: 'Elegant fine dining restaurant website with reservation system, menu showcase, and interactive gallery built with HTML, CSS, and JavaScript.',
    longDescription: `# Responsive Restaurant Website

A sophisticated fine dining restaurant website featuring elegant design, reservation system, menu showcase, and interactive gallery. Built with vanilla HTML, CSS, and JavaScript.

## Problem
Fine dining restaurants need an online presence that reflects their elegance and sophistication while providing essential functionality like reservations and menu browsing.

## Solution
A beautifully designed, responsive website that combines elegant aesthetics with practical features like online reservations, menu display, and gallery showcasing.

## Key Features
- **Elegant Design**: Sophisticated color palette with deep charcoal, warm cream, rich burgundy, and soft gold accents
- **Reservation System**: Multi-step reservation form with date/time selection
- **Menu Showcase**: Beautiful menu pages with specialty dishes and pricing
- **Interactive Gallery**: Image carousel showcasing restaurant ambiance and dishes
- **Chef Section**: Dedicated section highlighting the chef's expertise and background
- **Testimonials**: Customer reviews with elegant slider presentation
- **Location & Hours**: Clear contact information and operating hours

## Tech Stack
- HTML5 for structure
- CSS3 with Tailwind CDN for styling
- Vanilla JavaScript for interactivity
- Anime.js for smooth animations
- Splide.js for image carousels
- p5.js for creative background effects

## Design Highlights
- **Typography**: Playfair Display for headings, Inter for body, Cormorant Garamond for accents
- **Visual Effects**: Particle backgrounds, floating shapes, reveal animations
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **Color Psychology**: Warm, inviting tones that stimulate appetite

## Interactive Features
- Smooth scroll animations
- Reveal-on-scroll text effects
- Image carousel for testimonials
- Multi-step reservation form
- Hover effects on menu cards
- Mobile-responsive navigation`,
    tags: ['Restaurant', 'HTML', 'CSS', 'JavaScript', 'Fine Dining'],
    year: 2024,
    role: 'Frontend Developer',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Anime.js', 'Splide.js', 'p5.js'],
    liveUrl: '#',
    sourceUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&h=630&fit=crop'
    ],
    featured: false,
    highlightColor: '#d97706',
    metrics: {
      users: '1.5K+',
      stars: 12,
      lighthousePerf: 96,
    },
  },
  {
    slug: 'event-hub',
    title: 'Event Management Hub',
    shortDescription: 'Complete event management platform with ticketing, scheduling, and attendee management.',
    longDescription: `# Event Management Hub

A comprehensive event management platform that streamlines the entire event lifecycle from creation to post-event analytics. Built to handle everything from small workshops to large conferences.

## Problem
Event organizers struggle with fragmented tools for ticketing, scheduling, and attendee management. They need a unified platform that simplifies event operations while providing insights into attendee engagement.

## Solution
An all-in-one platform that combines event creation, ticketing, scheduling, attendee management, and analytics into a seamless workflow that saves time and improves event success.

## Key Features
- **Event Creation & Management**: Comprehensive event builder with customizable details, branding, and scheduling
- **Ticket Sales Integration**: Stripe-powered ticket sales with multiple pricing tiers and promotional codes
- **QR Code Generation**: Automated QR code generation for tickets and check-ins
- **Attendee Check-in System**: Mobile-friendly check-in with QR scanning and manual entry options
- **Analytics & Reporting**: Real-time analytics dashboard with attendance tracking, revenue reports, and engagement metrics
- **Email Notifications**: Automated email system for confirmations, reminders, and updates
- **Mobile App for Attendees**: PWA-enabled mobile experience for event discovery and ticket management

## Tech Stack
- Next.js 14 with App Router for server-side rendering
- Stripe for secure payment processing
- PostgreSQL for reliable data storage
- QR Code generation libraries
- Real-time analytics and reporting

## Design Highlights
- **Intuitive Dashboard**: Clean interface for event organizers
- **Mobile-Optimized**: Responsive design for on-the-go management
- **Real-time Updates**: Live data synchronization across devices
- **Professional Branding**: Customizable event pages with brand colors and logos

## Results
- Streamlined event operations
- Increased ticket sales
- Improved attendee experience
- Better event analytics
- Reduced manual work`,
    tags: ['Events', 'Ticketing', 'Management', 'Mobile'],
    year: 2023,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'Stripe', 'PostgreSQL', 'QR Code', 'Tailwind CSS'],
    liveUrl: 'https://sites-for-skill-observation.vercel.app/events',
    coverImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=630&fit=crop'
    ],
    featured: true,
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
    shortDescription: 'Modern tech blog with theme switching, Matrix dark mode, and interactive code examples.',
    longDescription: `# Tech Blog Platform

A modern blogging platform built for technical content with advanced theme switching, Matrix-inspired dark mode, and interactive code examples.

## Features
- Light/Dark theme switching with smooth transitions
- Matrix-inspired dark mode with green cyber-grid background
- Interactive code examples with syntax highlighting
- Search and filtering capabilities
- Responsive design with hidden scrollbars
- Modern UI with glassmorphism effects

## Tech Stack
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS with custom animations
- next-themes for theme management
- Lucide React for icons

## Design Highlights
- Cyber-grid background pattern in dark mode
- Smooth theme transitions
- Matrix-style green color scheme
- Professional and modern aesthetic
- Optimized for performance`,
    tags: ['Blog', 'Theme Switching', 'Dark Mode', 'Matrix', 'Technical'],
    year: 2024,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'next-themes', 'Vercel'],
    liveUrl: 'https://tech-blog-lyart.vercel.app',
    sourceUrl: 'https://github.com/NRGoranov/tech-blog',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=630&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop'
    ],
    featured: true,
    highlightColor: '#10b981',
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
