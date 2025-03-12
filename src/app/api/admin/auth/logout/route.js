import { NextResponse } from "next/server";

export async function POST(req) {
  const res = NextResponse.json({ message: "Logout successful" });

  res.cookies.delete("Admintoken", {
    httpOnly: true,
  });

  return res;
}
