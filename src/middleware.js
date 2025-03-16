// src/app/_middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("Admintoken");
    // Set CORS headers for all API requests
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*"); // Replace with your frontend domain for security
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle OPTIONS (preflight) request for CORS
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  if (!token) {
    // No userToken, redirect to homepage
    return NextResponse.redirect(new URL("/Admin", request.nextUrl));
  }

   return res;
}

// Apply middleware to routes under '/CutomerDashboard/*' and '/Admin/*'
export const config = {
  matcher: ["/Admin/(.*)", "/api/:path*"],
};
