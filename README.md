# NRG Portfolio Gallery

A blazing-fast, single-source portfolio hub built with Next.js 14, TypeScript, and Tailwind CSS. Showcase your projects with modern design, advanced filtering, and SEO optimization.

## ✨ Features

- **🚀 Performance**: Built with Next.js 14 App Router for optimal speed
- **🎨 Modern Design**: Premium UI with Tailwind CSS and Framer Motion
- **🔍 Advanced Search**: Fuzzy search across projects with real-time filtering
- **📱 Responsive**: Mobile-first design that works on all devices
- **🌙 Dark Mode**: System preference detection with smooth transitions
- **♿ Accessible**: WCAG compliant with keyboard navigation
- **🔍 SEO Optimized**: Dynamic OG images, sitemap, and structured data
- **📊 Analytics**: Vercel Analytics and Speed Insights integration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Search**: Fuse.js for fuzzy search
- **Validation**: Zod for type safety
- **Deployment**: Vercel-ready
- **Testing**: Vitest + Playwright

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nrg-site-gallery.git
   cd nrg-site-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Adding Projects

The portfolio is powered by a single data file. To add a new project:

1. **Edit `src/data/projects.ts`**
   ```typescript
   {
     slug: 'your-project-slug',
     title: 'Your Project Title',
     shortDescription: 'Brief description under 140 characters',
     longDescription: 'Optional longer description with markdown support',
     tags: ['Next.js', 'TypeScript', 'Tailwind'],
     year: 2024,
     role: 'Full Stack Developer',
     stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
     liveUrl: 'https://your-project.vercel.app',
     sourceUrl: 'https://github.com/username/project',
     coverImage: '/covers/your-project.jpg',
     gallery: ['/covers/project-1.jpg', '/covers/project-2.jpg'],
     featured: true,
     highlightColor: '#3b82f6',
     metrics: {
       users: '10K+',
       stars: 42,
       lighthousePerf: 98,
     },
   }
   ```

2. **Add cover images**
   - Place images in `public/covers/`
   - Recommended size: 1200x630px for optimal display
   - Use WebP format for better performance

3. **Update the project**
   The site will automatically rebuild with your new project!

## 🎨 Customization

### Colors and Branding

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // ... other colors
    },
  },
}
```

### Content

- **About page**: Edit `src/app/about/page.tsx`
- **Contact info**: Update social links in `src/app/contact/page.tsx`
- **Site metadata**: Modify `src/app/layout.tsx`

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Type Checking
```bash
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Deploy automatically**: Vercel will build and deploy on every push

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 📊 Performance

The site is optimized for performance with:

- **Static Generation**: All pages are pre-rendered
- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic code splitting for optimal loading
- **Caching**: Aggressive caching for static assets
- **Lighthouse Score**: 95+ across all metrics

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### SEO Configuration

Update `src/app/layout.tsx` with your site information:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Your portfolio description',
  // ... other metadata
}
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (OG images)
│   ├── projects/          # Project pages
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...
├── data/                 # Project data
├── lib/                  # Utilities and helpers
├── types/                # TypeScript types
└── test/                 # Test files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Framer Motion](https://framer.com/motion/) - Animation library
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ by [NRG](https://github.com/nrg)
