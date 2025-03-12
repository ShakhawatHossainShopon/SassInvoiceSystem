import { connectToDB } from "@/lib/mongodb";
import Store from "@/app/models/Store";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Secret key for JWT token, now using environment variable
const secretKey = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    // Step 1: Get the token from the 'Authorization' header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Step 2: Extract token from 'Authorization' header
    const token = authHeader.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 400 }
      );
    }

    // Step 3: Verify and decode the token
    const decoded = jwt.verify(token, secretKey);

    // Step 4: Connect to the database
    await connectToDB();

    // Step 5: Fetch store data based on the shopId decoded from the token
    const store = await Store.findOne({ shopId: decoded.shopId });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    // Step 6: Return the store data (excluding sensitive data)
    const storeData = {
      shopId: store.shopId,
      shopName: store.shopName,
      shopOwnerName: store.shopOwnerName,
      shopContact: store.shopContact,
      shopImage: store.shopImage,
      invoiceCount: store.invoiceCount,
    };

    return NextResponse.json(storeData, { status: 200 });
  } catch (error) {
    // Handle any errors (like token expiration, verification errors, etc.)
    return NextResponse.json(
      { error: "Failed to retrieve store" },
      { status: 500 }
    );
  }
}
