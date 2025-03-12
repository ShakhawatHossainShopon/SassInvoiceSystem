import mongoose from "mongoose";

// Define the Invoice schema
const InvoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  items: [
    {
      description: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Define the Admin schema with an array of invoices
const ShopSchema = new mongoose.Schema({
  shopId: {
    type: String,
    required: true,
  },
  shopContact: {
    type: Number,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  shopOwnerName: {
    type: String,
    required: true,
  },
  shopImage: {
    type: String,
    required: true,
  },
  invoiceCount: {
    type: Number,
  },
  invoices: [InvoiceSchema], // Array of invoices
});

export default mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
