import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET })
  // console.log(`req : `, req)
  // console.log(`req pathname`, req.nextUrl.pathname)

  const pathname = req.nextUrl.pathname

  // 로그인 된 사용자만 가능
  if(pathname.startsWith('/user') && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // 어드민 사용자만 가능
  if(pathname.startsWith('/admin') && (session?.role !== 'admin')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 로그인 된 유저는 로그인, 회원가입 페이지 접근 x
  if(pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

// export const config = { matcher: ["/admin/:path*", "/user"]}
