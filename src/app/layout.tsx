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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nrg-portfolio.vercel.app',
    title: 'NRG Portfolio - Modern Web Development',
    description: 'A showcase of modern web development projects built with Next.js, TypeScript, and cutting-edge technologies.',
    siteName: 'NRG Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NRG Portfolio - Modern Web Development',
    description: 'A showcase of modern web development projects built with Next.js, TypeScript, and cutting-edge technologies.',
    creator: '@nrg',
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
