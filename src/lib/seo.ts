import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

const ogImage = {
  url: '/og-image',
  width: 1200,
  height: 630,
  alt: 'NRG — business automation for restaurants and growing businesses',
}

export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
}: {
  title: string
  description: string
  path: string
  absolute?: boolean
}): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'NRG',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  }
}
