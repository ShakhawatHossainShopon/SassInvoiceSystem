import Store from "@/app/models/Store";
import { connectToDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Secret key used to decode the token (for now, use your secret key here)
const secretKey = process.env.JWT_SECRET;
export async function GET(req) {
  try {
    // Step 1: Get the token from the Authorization header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header is missing" },
        { status: 400 }
      );
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return NextResponse.json({ error: "Token is missing" }, { status: 400 });
    }

    // Step 2: Decode the token to get shopId
    const decoded = jwt.verify(token, secretKey);
    const shopId = decoded.shopId;

    if (!shopId) {
      return NextResponse.json(
        { error: "Invalid token or shopId missing in token" },
        { status: 400 }
      );
    }

    // Step 3: Connect to the database
    await connectToDB();

    // Step 4: Fetch the shop data from the database using shopId
    const shop = await Store.findOne({ shopId });

    if (!shop) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    // Step 5: Return the invoices for that shop
    return NextResponse.json({ invoices: shop.invoices }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch invoices: ${error.message}` },
      { status: 500 }
    );
  }
}
