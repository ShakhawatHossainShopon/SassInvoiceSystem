import Admin from "@/app/models/Admin";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const Admins = await Admin.find();
    return NextResponse.json({ Admins });
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { error: `Failed to fetch users and shops: ${error}` },
      { status: 500 }
    );
  }
}
