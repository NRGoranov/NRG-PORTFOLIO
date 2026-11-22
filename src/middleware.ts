import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const hiddenPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Page not found</title>
  </head>
  <body style="margin:0;min-height:100vh;background:#020617;color:#e2e8f0;font-family:ui-sans-serif,system-ui,sans-serif">
    <main style="max-width:40rem;margin:0 auto;padding:4rem 1.25rem">
      <h1 style="margin:0;font-size:2rem;line-height:1.2">Page not found</h1>
      <p style="margin:1rem 0 0">That address is not available.</p>
      <p style="margin:1.5rem 0 0"><a href="/" style="color:#93c5fd">Back home</a></p>
    </main>
  </body>
</html>`

export function middleware(request: NextRequest) {
  if (process.env.CLOTHING_PUBLIC === 'true') {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl
  const hidden =
    pathname === '/clothing' ||
    pathname.startsWith('/clothing/') ||
    pathname.startsWith('/api/clothing')

  if (!hidden) return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ ok: false, message: 'Not found.' }, { status: 404 })
  }

  return new NextResponse(hiddenPage, {
    status: 404,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
    },
  })
}

export const config = {
  matcher: ['/clothing', '/clothing/:path*', '/api/clothing/:path*'],
}
