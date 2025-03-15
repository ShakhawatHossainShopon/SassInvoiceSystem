import Store from "@/app/models/Store";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Secret key for JWT token (this should ideally be in an environment variable)
const secretKey = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        // Receive the shopId from the request body
        const { shopId } = await req.json();


        if (!shopId) {
            return NextResponse.json({ error: "Shop ID is missing" }, { status: 400 });
        }

        await connectToDB();

        const shop = await Store.findOne({ shopId: shopId });

        if (!shop) {
            return NextResponse.json({ error: "Shop not found" }, { status: 404 });
        }

        // Reset the invoices for the shop
        shop.invoices = []; // Clear the invoices array
        shop.invoiceCount = 0; // Reset the invoice count

        await shop.save(); // Save the updated shop document

        return NextResponse.json({
            message: "Invoices reset successfully.",
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to reset invoices" }, { status: 500 });
    }
}
