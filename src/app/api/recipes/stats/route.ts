import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Recipe from "@/models/Recipe";

export async function GET() {
  try {
    await connectDB();

    const categoryStats = await Recipe.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const formatted = categoryStats.map((item) => ({
      category: item._id,
      count: item.count,
    }));

    return NextResponse.json({ success: true, stats: formatted });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}