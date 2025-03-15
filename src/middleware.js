// src/app/_middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("Admintoken");

  if (!token) {
    // No userToken, redirect to homepage
    return NextResponse.redirect(new URL("/Admin", request.nextUrl));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Apply middleware to routes under '/CutomerDashboard/*' and '/Admin/*'
export const config = {
  matcher: ["/Admin/(.*)"],
};
