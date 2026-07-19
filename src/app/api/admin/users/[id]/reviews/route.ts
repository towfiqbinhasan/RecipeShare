import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Recipe from "@/models/Recipe";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "You must be logged in" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access only" }, { status: 403 });
    }

    await connectDB();

    const targetUser = await User.findById(id).select("name email");
    if (!targetUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Find all recipes that contain a review from this user
    const recipes = await Recipe.find({ "reviews.user": id })
      .select("title reviews")
      .lean();

    const userReviews = recipes.flatMap((recipe) =>
      recipe.reviews
        .filter((r) => r.user.toString() === id)
        .map((r) => ({
          recipeId: recipe._id,
          recipeTitle: recipe.title,
          rating: r.rating,
          comment: r.comment,
          createdAt: r.createdAt,
        }))
    );

    userReviews.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      user: targetUser,
      reviews: userReviews,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error occurred" }, { status: 500 });
  }
}