import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NRG Portfolio - Modern Web Development',
    template: '%s | NRG Portfolio'
  },
  description: 'A showcase of modern web development projects built with Next.js, TypeScript, and cutting-edge technologies.',
  keywords: ['portfolio', 'web development', 'Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
  authors: [{ name: 'NRG' }],
  creator: 'NRG',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon.ico' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nrg-portfolio-murex.vercel.app',
    title: 'NRG Portfolio - Modern Web Development',
    description: 'A showcase of modern web development projects built with Next.js, TypeScript, and cutting-edge technologies.',
    siteName: 'NRG Portfolio',
    images: [
      {
        url: 'https://nrg-portfolio-murex.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NRG Portfolio - Full-Stack Developer showcasing modern web development projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NRG Portfolio - Modern Web Development',
    description: 'A showcase of modern web development projects built with Next.js, TypeScript, and cutting-edge technologies.',
    creator: '@nrg',
    images: ['https://nrg-portfolio-murex.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nrg-portfolio-murex.vercel.app" />
        <meta property="og:title" content="NRG Portfolio - Modern Web Development" />
        <meta property="og:description" content="A showcase of modern web development projects built with Next.js, TypeScript, and cutting-edge technologies." />
        <meta property="og:image" content="https://nrg-portfolio-murex.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="NRG Portfolio - Full-Stack Developer showcasing modern web development projects" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NRG Portfolio - Modern Web Development" />
        <meta name="twitter:description" content="A showcase of modern web development projects built with Next.js, TypeScript, and cutting-edge technologies." />
        <meta name="twitter:image" content="https://nrg-portfolio-murex.vercel.app/og-image.png" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background/95 backdrop-blur-sm">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
