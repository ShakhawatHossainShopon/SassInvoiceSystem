import User from "@/app/models/User";
import Store from "@/app/models/Store";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET all users and shops
export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all users and shops from their respective collections
    const users = await User.find(); // Retrieve all users
    const shops = await Store.find(); // Retrieve all shops

    // Return the users and shops as a response
    return NextResponse.json({ users });
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { error: `Failed to fetch users and shops: ${error}` },
      { status: 500 }
    );
  }
}
