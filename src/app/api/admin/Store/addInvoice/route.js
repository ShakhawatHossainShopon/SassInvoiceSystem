import Store from "@/app/models/Store";
import { connectToDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { newInvoice } = await req.json(); // Get new invoice data from the request body

    // Step 1: Extract shopId from JWT token
    const shopId = verifyToken(req); // This will throw an error if the token is invalid

    // Step 2: Connect to the database
    await connectToDB();

    // Step 3: Find the store by shopId
    const store = await Store.findOne({ shopId });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    // Step 4: Add the new invoice to the invoices array
    store.invoices.push(newInvoice);

    // Step 5: Update the invoice count based on the length of the invoices array
    store.invoiceCount = store.invoices.length;

    // Step 6: Save the store document with updated invoices and invoice count
    await store.save();

    // Step 7: Return the updated invoice count in the response
    return NextResponse.json({
      Success: "Invoice Added Successfully",
      invoiceCount: store.invoiceCount, // Return the updated invoice count
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Add Invoice: ${error.message}` },
      { status: 500 }
    );
  }
}

// {
//   "newInvoice": {
//     "invoiceId": "INV123",
//     "date": "2025-03-12T12:00:00Z",
//     "amount": 500,
//     "items": [
//       {
//         "description": "Item 1",
//         "quantity": 2,
//         "price": 100
//       },
//       {
//         "description": "Item 2",
//         "quantity": 3,
//         "price": 50
//       }
//     ]
//   }
// }
