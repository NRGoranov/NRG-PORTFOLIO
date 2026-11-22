import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/clothing', '/clothing/', '/api/', '/private/', '/admin/'],
    },
    sitemap: 'https://www.nrgtrw.com/sitemap.xml',
  }
}
