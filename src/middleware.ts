import { ROUTE } from '@/constants/routes'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIES_TOKEN_NAME } from './constants/cookies'

const NOT_AUTHORIZATION_ROUTES: string[] = [
  ROUTE.HOME,
  ROUTE.CALCULATE,
  ROUTE.AUTH.SOCIAL_AUTH,
  ROUTE.AUTH.PASSWORD_FORGOT(),
  ROUTE.AUTH.PASSWORD_RESET,
]

export function middleware(request: NextRequest) {
  // TODO: Temporal redirection meanwhile landing is not ready
  if (request.nextUrl.pathname === ROUTE.HOME) {
    return NextResponse.rewrite(new URL(ROUTE.CALCULATE, request.url))
  }

  // Validation for routes that require / do not require authentication
  if (NOT_AUTHORIZATION_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  } else {
    const authToken = request.cookies.get(COOKIES_TOKEN_NAME)

    if (!authToken) {
      return NextResponse.redirect(new URL(ROUTE.HOME, request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
