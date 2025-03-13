import Store from "@/app/models/Store";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const store = await Store.find();

    return NextResponse.json({ store });
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { error: `Failed to fetch Store: ${error}` },
      { status: 500 }
    );
  }
}
