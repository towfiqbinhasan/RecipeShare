import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Recipe from "@/models/Recipe";
import { verifyToken } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Please log in to leave a review" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Session expired" },
        { status: 401 }
      );
    }

    const { rating, comment } = await req.json();
    if (!rating || !comment) {
      return NextResponse.json(
        { success: false, message: "Please provide a rating and comment" },
        { status: 400 }
      );
    }

    await connectDB();

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return NextResponse.json(
        { success: false, message: "Recipe not found" },
        { status: 404 }
      );
    }

    recipe.reviews.push({
      user: payload.userId,
      rating,
      comment,
      createdAt: new Date(),
    });

    const total = recipe.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0);
    recipe.averageRating = total / recipe.reviews.length;

    await recipe.save();

    return NextResponse.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}