import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  const isProtectedRoute = pathname.startsWith("/produtos")
  const isAuthRoute = pathname.startsWith("/auth/sign-in")

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url))
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/produtos", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/produtos/:path*", "/auth/:path*"],
}