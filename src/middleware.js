// src/app/_middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("Admintoken");
  const userToken = request.cookies.get("userToken");

  // Check if the user is trying to access the page they are being redirected to
  if (path === "/CutomerDashboard/dashboard" && userToken && !token) {
    return NextResponse.next(); // User with only userToken can access the dashboard
  }

  console.log("User Token:", userToken); // Debugging log
  console.log("Admin Token:", token); // Debugging log

  if (!userToken) {
    // No userToken, redirect to homepage
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (userToken && !token) {
    // User with userToken but no Admintoken, redirect to customer dashboard
    return NextResponse.redirect(
      new URL("/CutomerDashboard/dashboard", request.nextUrl)
    );
  }

  // If both tokens are missing or not valid, redirect to homepage
  if (!userToken && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Apply middleware to routes under '/CutomerDashboard/*' and '/Admin/*'
export const config = {
  matcher: ["/CutomerDashboard/(.*)", "/Admin/(.*)"],
};
