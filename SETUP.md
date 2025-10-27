# Setup Guide

This guide will help you set up the NRG Portfolio Gallery for development and deployment.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Sample Images

The project includes placeholder files for cover images. Replace them with actual images:

```bash
# Create cover images directory
mkdir -p public/covers

# Add your project images (recommended: 1200x630px, WebP format)
# - matcha-shop.jpg
# - tees-store.jpg
# - fitness-blog.jpg
# - real-estate.jpg
# - nonprofit.jpg
# - learning.jpg
# - event-hub.jpg
# - tech-blog.jpg
```

### 3. Customize Your Data

Edit `src/data/projects.ts` to add your projects:

```typescript
// Copy this template for new projects
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

### 4. Update Site Information

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Your portfolio description',
  // Update with your information
}
```

### 5. Update Contact Information

Edit `src/app/contact/page.tsx` and `src/app/about/page.tsx` with your details.

## 🎨 Customization

### Colors and Branding

1. **Primary Colors**: Edit `src/app/globals.css`
2. **Logo**: Replace the NRG logo in `src/components/Header.tsx`
3. **Favicon**: Add your favicon to `public/`

### Content

1. **About Page**: Update bio in `src/app/about/page.tsx`
2. **Contact Links**: Update social links in multiple files
3. **Site Title**: Update in `src/app/layout.tsx`

## 🧪 Development

### Run Development Server

```bash
npm run dev
```

### Run Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

### Linting and Formatting

```bash
# Lint code
npm run lint

# Format code
npx prettier --write .
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Automatic Deployment**: Vercel will build and deploy automatically
3. **Environment Variables**: Add any required environment variables

### Manual Deployment

1. **Build Project**:
   ```bash
   npm run build
   ```

2. **Deploy**: Upload the `.next` folder to your hosting provider

## 📊 Performance Optimization

### Image Optimization

- Use WebP format for cover images
- Recommended size: 1200x630px for hero images
- Use Next.js Image component for automatic optimization

### SEO Optimization

- Update metadata in `src/app/layout.tsx`
- Add your Google Analytics ID
- Update sitemap configuration in `next-sitemap.config.js`

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript errors with `npm run type-check`
2. **Image Loading**: Ensure images are in the correct `public/covers/` directory
3. **Styling Issues**: Verify Tailwind CSS is properly configured

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)
- Open an issue in the repository

## 📝 Next Steps

1. **Add Your Projects**: Update `src/data/projects.ts` with your work
2. **Customize Design**: Modify colors, fonts, and layout
3. **Add Analytics**: Integrate Google Analytics or Vercel Analytics
4. **Deploy**: Push to Vercel or your preferred hosting platform

---

Happy coding! 🚀



