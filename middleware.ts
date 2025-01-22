import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const response = NextResponse.next()
  const usertoken = request.cookies.get("usertoken")

  if (!usertoken) return NextResponse.rewrite(new URL("/", request.url))

  return response
}

export const config = {
  matcher: ['/pendientes/:path*', '/realizados/:path*', '/admin/:path*'],
}