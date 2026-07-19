"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";
import { ChefHat, Eye, Trash2, MessageSquare, ShieldCheck } from "lucide-react";

interface Recipe {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  averageRating: number;
  reviews: unknown[];
  createdBy: { _id: string; name: string; email?: string };
  createdAt: string;
}

export default function AdminRecipesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast.error("Please log in to continue");
        router.push("/login");
      } else if (user.role !== "admin") {
        toast.error("Admin access only");
        router.push("/");
      }
    }
  }, [authLoading, user, router]);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recipes?limit=100&sort=newest");
      const data = await res.json();
      if (data.success) {
        setRecipes(data.recipes);
      }
    } catch {
      toast.error("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") fetchRecipes();
  }, [user, fetchRecipes]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This may be another user's recipe.`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setRecipes((prev) => prev.filter((r) => r._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error occurred");
    } finally {
      setDeletingId(null);
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Manage All Recipes</h1>
            <p className="text-gray-500 text-sm mt-1">View and delete recipes posted by any user</p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 h-64 animate-pulse" />
        ) : recipes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center">
            <ChefHat className="text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No recipes found</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-[64px_1fr_140px_120px_100px_140px] gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
              <span>Image</span>
              <span>Title / Author</span>
              <span>Category</span>
              <span>Rating</span>
              <span>Reviews</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-gray-100">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="grid grid-cols-1 md:grid-cols-[64px_1fr_140px_120px_100px_140px] gap-4 px-6 py-4 items-center"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                    {recipe.imageUrl ? (
                      <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ChefHat className="text-gray-300" size={18} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{recipe.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      by {recipe.createdBy?.name || "Unknown"}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">{recipe.category}</span>
                  <span className="text-sm text-gray-600">⭐ {recipe.averageRating.toFixed(1)}</span>
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <MessageSquare size={14} /> {recipe.reviews?.length || 0}
                  </span>
                  <div className="flex items-center gap-2 md:justify-end">
                    <Link
                      href={`/recipes/${recipe._id}`}
                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-200 transition-colors"
                      title="View recipe & reviews"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(recipe._id, recipe.title)}
                      disabled={deletingId === recipe._id}
                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}