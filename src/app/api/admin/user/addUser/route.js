import Store from "@/app/models/Store";
import User from "@/app/models/User";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const {
      email,
      password,
      username,
      shopName,
      shopOwnerName,
      shopImage,
      shopContact,
      shopAddress,
    } = await req.json();
    const shopId = uuidv4();
    const role = "User";
    await connectToDB();
    console.log(
      email,
      password,
      username,
      shopName,
      shopOwnerName,
      shopImage,
      shopContact,
      shopId,
      shopAddress
    );

    const NewUser = new User({
      email,
      password,
      username,
      shopId,
      role,
    });

    const NewShop = new Store({
      email,
      password,
      username,
      shopName,
      shopOwnerName,
      shopImage,
      shopContact,
      shopId,
      shopAddress,
      invoices: [],
      invoiceCount: 0,
    });

    await NewUser.save();
    await NewShop.save();
    return NextResponse.json({ Success: "Shop And User Created Succesfully" });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: `Failed to Register ${error}` },
      { status: 500 }
    );
  }
}

// {
//   "email": "testuser@example.com",
//   "password": "password123",
//   "username": "testuser",
//   "shopName": "Test Shop",
//   "shopOwnerName": "John Doe",
//   "shopImage": "https://example.com/shop-image.jpg",
//   "shopContact": 1234567890
// }
