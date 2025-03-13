import User from "@/app/models/User";
import Store from "@/app/models/Store";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// DELETE user and their associated shop
export async function DELETE(req) {
  try {
    // Connect to the database
    await connectToDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId"); // Assuming userId is passed as a query parameter

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find the user by userId
    const user = await User.findById(userId); // Using findById for MongoDB default _id
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the associated shopId from the user document
    const shopId = user.shopId;
    if (!shopId) {
      return NextResponse.json(
        { error: "Shop ID not found for this user" },
        { status: 404 }
      );
    }

    // Delete the associated shop using shopId
    const deletedStore = await Store.findOneAndDelete({ shopId: shopId }); // Use shopId to delete the shop

    // If shop deletion failed
    if (!deletedStore) {
      return NextResponse.json(
        { error: "Failed to delete the shop" },
        { status: 404 }
      );
    }

    // Delete the user by userId
    const deletedUser = await User.findByIdAndDelete(userId); // Using findByIdAndDelete to delete user by MongoDB _id

    if (!deletedUser) {
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User and Shop deleted successfully" });
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { error: `Failed to delete user and shop: ${error.message}` },
      { status: 500 }
    );
  }
}
