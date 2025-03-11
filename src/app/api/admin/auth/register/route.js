import { connectToDB } from "@/lib/mongodb";
import Admin from "@/app/models/Admin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();
    await connectToDB();
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin Already Exist" },
        { status: 400 }
      );
    }
    // password hash
    const hashPassword = await bcrypt.hash(password, 10);

    const NewAdmin = new Admin({ email, username, password: hashPassword });
    await NewAdmin.save();
    return NextResponse.json({ Success: "Admin Created Succesfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to Register" }, { status: 500 });
  }
}
