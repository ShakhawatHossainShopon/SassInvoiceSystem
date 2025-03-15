import Store from "@/app/models/Store";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    try {
        const { permission, shopId } = await req.json();

        if (!shopId) {
            return NextResponse.json({ error: "Shop ID is required" }, { status: 400 });
        }

        console.log("Updating permission for:", shopId, "New permission:", permission);

        await connectToDB();

        const store = await Store.findOneAndUpdate(
            { _id: shopId }, // Find the store by ID
            { $set: { permission } }, // Update the permission field
            { new: true } // Return the updated document
        );

        if (!store) {
            return NextResponse.json({ error: "Shop not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Permission updated", store }, { status: 200 });

    } catch (error) {
        console.error("Error updating permission:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
