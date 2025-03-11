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
      shopId
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
      invoices: [],
    });

    await NewUser.save();
    await NewShop.save();
    return NextResponse.json({ Success: "Shop And User Created Succesfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Register ${error}` },
      { status: 500 }
    );
  }
}
