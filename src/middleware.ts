import { ROUTE } from '@/constants/routes'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === ROUTE.HOME) {
    return NextResponse.rewrite(new URL(ROUTE.CALCULATE, request.url))
  }
}
