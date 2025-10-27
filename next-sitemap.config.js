/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nrg-portfolio.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
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
        disallow: ['/api/', '/private/'],
      },
    ],
    additionalSitemaps: [
      'https://nrg-portfolio.vercel.app/sitemap.xml',
    ],
  },
}
