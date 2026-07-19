import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Recipe from "@/models/Recipe";
import { verifyToken } from "@/lib/auth";

// GET: list recipes with search, filter, sort, pagination
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    const query: Record<string, unknown> = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }

    let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "rating") sortOption = { averageRating: -1 };
    if (sort === "time-asc") sortOption = { cookingTime: 1 };
    if (sort === "time-desc") sortOption = { cookingTime: -1 };

    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      Recipe.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "name")
        .lean(),
      Recipe.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      recipes,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}

// POST: create a new recipe (protected)
export async function POST(req: NextRequest) {
  try {
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
        { success: false, message: "Session expired, please log in again" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      shortDescription,
      fullDescription,
      ingredients,
      category,
      cookingTime,
      difficulty,
      imageUrl,
    } = body;

    if (!title || !shortDescription || !fullDescription || !ingredients || !category || !cookingTime) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const newRecipe = await Recipe.create({
      title,
      shortDescription,
      fullDescription,
      ingredients: Array.isArray(ingredients)
        ? ingredients
        : String(ingredients).split(",").map((i: string) => i.trim()).filter(Boolean),
      category,
      cookingTime,
      difficulty: difficulty || "Easy",
      imageUrl: imageUrl || "",
      createdBy: payload.userId,
    });

    return NextResponse.json(
      { success: true, message: "Recipe added successfully", recipe: newRecipe },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}