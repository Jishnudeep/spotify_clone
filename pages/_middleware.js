import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  //Allow request to go ahead if following is true
  // if Token exists
  // its a request for next-auth session and provider fetching
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //Redirect them to login if they do not have token AND are
  // requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }

  //Redirect them to home page if they are already logged in and try
  // to access login page
  if (token && pathname === "/login") {
    return NextResponse.redirect("/");
  }
}
