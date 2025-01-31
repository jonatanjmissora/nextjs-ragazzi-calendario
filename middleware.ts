import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const response = NextResponse.next()
  const usertoken = request.cookies.get("usertoken")

  if (!usertoken) return NextResponse.rewrite(new URL("/", request.url))

  const { device } = userAgent(request)

  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'

  response.cookies.set("viewport", viewport)


  return response
}

export const config = {
  matcher: ['/pendientes/:path*', '/realizados/:path*', '/admin/:path*'],
}