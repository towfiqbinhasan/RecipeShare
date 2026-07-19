import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Recipe from "@/models/Recipe";
import { verifyToken } from "@/lib/auth";

// GET: single recipe details (public)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const recipe = await Recipe.findById(id)
      .populate("createdBy", "name")
      .populate("reviews.user", "name")
      .lean();

    if (!recipe) {
      return NextResponse.json(
        { success: false, message: "Recipe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, recipe });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}

// DELETE: remove a recipe (protected, owner or admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "You must be logged in" },
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

    await connectDB();

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return NextResponse.json(
        { success: false, message: "Recipe not found" },
        { status: 404 }
      );
    }

    if (recipe.createdBy.toString() !== payload.userId && payload.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "You don't have permission to delete this recipe" },
        { status: 403 }
      );
    }

    await Recipe.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}