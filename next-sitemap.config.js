/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.nrgtrw.com',
  // App Router serves src/app/sitemap.ts and src/app/robots.ts.
  // Writing those files into public/ makes Next.js throw a conflict in development.
  generateRobotsTxt: false,
  outDir: './.sitemap',
  generateIndexSitemap: false,
  exclude: ['/api/*', '/clothing', '/clothing/*', '/og-image'],
  additionalPaths: async (config) => {
    const { projects } = await import('./src/data/projects.ts')
    return projects.map((project) => ({
      loc: `/projects/${project.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
    }))
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/', '/clothing', '/clothing/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://www.nrgtrw.com/sitemap.xml',
    ],
  },
}
