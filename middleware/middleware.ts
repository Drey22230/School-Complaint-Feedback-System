import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));

    res.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return res;
  }
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/userdashboard/:path*",
    "/complaints/:path*",
  ],
};