import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(
  request: NextRequest
) {

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/planning/:path*',
    '/methodologie/:path*',
    '/cv-builder/:path*',
    '/assistant/:path*',
  ],
}