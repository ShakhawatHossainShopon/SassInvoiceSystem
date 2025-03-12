import { connectToDB } from "@/lib/mongodb";
import Admin from "@/app/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectToDB();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const Admintoken = jwt.sign(
      { email: admin.email, role: admin.role },
      process.env.JWT_SECRET
    );
    const res = NextResponse.json({ message: "Login successful" });

    res.cookies.set("Admintoken", Admintoken, {
      httpOnly: true,
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
