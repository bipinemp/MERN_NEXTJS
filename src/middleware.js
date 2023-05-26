import { NextResponse } from "next/server";
import { verifyJwtToken } from "./app/libs/auth";

export async function middleware(request) {
  const secret = process.env.JWT_SECRET;
  const jwt = request.cookies.get("jwt")?.value;
  const path = request.nextUrl.pathname;

  if (!jwt && !["/login", "/register"].includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (jwt && (path === "/login" || path === "/register")) {
    try {
      await verifyJwtToken(secret);
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/"],
};
