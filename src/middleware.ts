import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Simple guard: require presence of Supabase access token cookie for admin area
  // Note: full authorization is still enforced client-side; this prevents obvious anonymous access.
  const hasToken = req.cookies.has('sb-access-token') || req.cookies.has('sb:token')
  if (!hasToken) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}


