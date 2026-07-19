import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

// GET: list all users (admin only)
export async function GET(req: NextRequest) {
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
        { success: false, message: "Session expired" },
        { status: 401 }
      );
    }

    if (payload.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access only" },
        { status: 403 }
      );
    }

    await connectDB();

    const users = await User.find({}).select("-password").sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}

// PATCH: block/unblock a user (admin only)
export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "You must be logged in" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access only" }, { status: 403 });
    }

    const { userId, isBlocked } = await req.json();

    if (userId === payload.userId) {
      return NextResponse.json(
        { success: false, message: "You cannot block your own account" },
        { status: 400 }
      );
    }

    await connectDB();

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    if (targetUser.role === "admin") {
      return NextResponse.json(
        { success: false, message: "Cannot block another admin" },
        { status: 400 }
      );
    }

    targetUser.isBlocked = isBlocked;
    await targetUser.save();

    return NextResponse.json({
      success: true,
      message: isBlocked ? "User has been blocked" : "User has been unblocked",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error occurred" }, { status: 500 });
  }
}

// DELETE: remove a user (admin only)
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "You must be logged in" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access only" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID required" }, { status: 400 });
    }
    if (userId === payload.userId) {
      return NextResponse.json(
        { success: false, message: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    await connectDB();

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    if (targetUser.role === "admin") {
      return NextResponse.json(
        { success: false, message: "Cannot delete another admin" },
        { status: 400 }
      );
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({ success: true, message: "User has been deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error occurred" }, { status: 500 });
  }
}