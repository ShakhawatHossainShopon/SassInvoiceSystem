// src/app/_middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("Admintoken");

  if (!token) {
    return NextResponse.redirect(new URL("/Admin", request.nextUrl));
  }
  return NextResponse.next();
}

// Apply middleware to routes under '/admin/*'
export const config = {
  matcher: ["/Admin/(.*)"], // This matches /admin and all sub-paths under it
};
