"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";
import { Users, ShieldCheck, Ban, ShieldOff, Trash2, MessageSquare, X, Star } from "lucide-react";

interface AppUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  createdAt: string;
}

interface UserReview {
  recipeId: string;
  recipeTitle: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  // Review modal state
  const [reviewModalUser, setReviewModalUser] = useState<AppUser | null>(null);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast.error("Please log in to view this page");
        router.push("/login");
      } else if (user.role !== "admin") {
        toast.error("Admin access only");
        router.push("/");
      }
    }
  }, [authLoading, user, router]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") fetchUsers();
  }, [user, fetchUsers]);

  const handleToggleBlock = async (targetUser: AppUser) => {
    setActionId(targetUser._id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: targetUser._id, isBlocked: !targetUser.isBlocked }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUsers((prev) =>
          prev.map((u) => (u._id === targetUser._id ? { ...u, isBlocked: !u.isBlocked } : u))
        );
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error occurred");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (targetUser: AppUser) => {
    if (!confirm(`Delete "${targetUser.name}"? This cannot be undone.`)) return;

    setActionId(targetUser._id);
    try {
      const res = await fetch(`/api/admin/users?userId=${targetUser._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUsers((prev) => prev.filter((u) => u._id !== targetUser._id));
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error occurred");
    } finally {
      setActionId(null);
    }
  };

  const handleViewReviews = async (targetUser: AppUser) => {
    setReviewModalUser(targetUser);
    setReviewsLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${targetUser._id}/reviews`);
      const data = await res.json();
      if (data.success) {
        setUserReviews(data.reviews);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  const closeModal = () => {
    setReviewModalUser(null);
    setUserReviews([]);
  };

  if (authLoading || !user || user.role !== "admin") {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center">
            <ShieldCheck className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-500 text-sm mt-1">Admin-only view of all registered users</p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 h-64 animate-pulse" />
        ) : users.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center">
            <Users className="text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_1fr_100px_100px_140px_190px] gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span>Joined</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-gray-100">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_100px_100px_140px_190px] gap-4 px-6 py-4 items-center"
                >
                  <span className="text-sm font-medium text-gray-900">{u.name}</span>
                  <span className="text-sm text-gray-600">{u.email}</span>
                  <span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-gray-900 text-white"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </span>
                  <span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.isBlocked ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
                      }`}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <div className="flex items-center gap-2 md:justify-end">
                    <button
                      onClick={() => handleViewReviews(u)}
                      title="View reviews"
                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
                    >
                      <MessageSquare size={16} />
                    </button>
                    {u.role !== "admin" && (
                      <>
                        <button
                          onClick={() => handleToggleBlock(u)}
                          disabled={actionId === u._id}
                          title={u.isBlocked ? "Unblock" : "Block"}
                          className={`p-2 rounded-lg border transition-colors disabled:opacity-50 ${
                            u.isBlocked
                              ? "border-green-200 text-green-600 hover:bg-green-50"
                              : "border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-200"
                          }`}
                        >
                          {u.isBlocked ? <ShieldOff size={16} /> : <Ban size={16} />}
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          disabled={actionId === u._id}
                          title="Delete"
                          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review modal */}
      {reviewModalUser && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-semibold text-gray-900">{reviewModalUser.name}&apos;s Reviews</h2>
                <p className="text-xs text-gray-500 mt-0.5">{reviewModalUser.email}</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-4">
              {reviewsLoading ? (
                <p className="text-gray-400 text-sm text-center py-8">Loading...</p>
              ) : userReviews.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">This user hasn&apos;t posted any reviews yet</p>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">{review.recipeTitle}</p>
                        <span className="flex items-center gap-0.5 text-xs text-yellow-600">
                          <Star size={12} className="fill-yellow-500 text-yellow-500" /> {review.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}