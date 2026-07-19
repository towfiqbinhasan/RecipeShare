import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ success: true, message: "MongoDB connection successful!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "MongoDB connection failed", error: String(error) },
      { status: 500 }
    );
  }
}