import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Syne, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BackToTopButton } from '@/components/BackToTopButton'
import { AudienceMeasurement } from '@/components/AudienceMeasurement'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nrgtrw.com'),
  title: {
    default: 'NRG — Business automation for restaurants and growing businesses',
    template: '%s | NRG',
  },
  description:
    'AI-powered customer communication, CRM, and automation for restaurants and growing businesses. Book a consultation with Nikolay Goranov.',
  keywords: [
    'NRG',
    'business automation',
    'restaurant CRM',
    'customer communication',
    'hospitality software',
    'Nikolay Goranov',
  ],
  authors: [{ name: 'Nikolay Goranov', url: 'https://www.nrgtrw.com/about' }],
  creator: 'Nikolay Goranov',
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
    url: 'https://www.nrgtrw.com',
    title: 'NRG — Business automation for restaurants and growing businesses',
    description:
      'AI-powered customer communication, CRM, and automation for restaurants and growing businesses.',
    siteName: 'NRG',
    images: [
      {
        url: '/og-image',
        width: 1200,
        height: 630,
        alt: 'NRG — business automation for restaurants and growing businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NRG — Business automation for restaurants and growing businesses',
    description:
      'AI-powered customer communication, CRM, and automation for restaurants and growing businesses.',
    images: ['/og-image'],
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
      </head>
      <body className={`${plusJakartaSans.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer />
          </div>
          <BackToTopButton />
          <AudienceMeasurement />
        </ThemeProvider>
      </body>
    </html>
  )
}
