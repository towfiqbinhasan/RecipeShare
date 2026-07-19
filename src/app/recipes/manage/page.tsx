"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";
import { Eye, Trash2, Plus, ChefHat } from "lucide-react";

interface Recipe {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  cookingTime: number;
  difficulty: string;
  imageUrl: string;
  averageRating: number;
  createdAt: string;
  createdBy?: { _id: string; name: string };
}

export default function ManageRecipesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast.error("Please log in to view this page");
        router.push("/login");
      } else if (user.role === "admin") {
        toast.error("This page is for regular users only");
        router.push("/admin/recipes");
      }
    }
  }, [authLoading, user, router]);

  const fetchMyRecipes = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const url =
        user.role === "admin"
          ? `/api/recipes?limit=100`
          : `/api/recipes?createdBy=${user._id}&limit=50`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setRecipes(data.recipes);
      }
    } catch {
      toast.error("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchMyRecipes();
  }, [user, fetchMyRecipes]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete the recipe "${title}"?`)) return;

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

 if (authLoading || !user || user.role === "admin") {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </main>
    );
  }

  const gridCols = isAdmin
    ? "md:grid-cols-[80px_1fr_140px_120px_100px_140px_140px]"
    : "md:grid-cols-[80px_1fr_140px_120px_100px_140px]";

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isAdmin ? "All Recipes (Admin)" : "My Recipes"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isAdmin
                ? "Manage all recipes across the platform"
                : "Manage the recipes you've added"}
            </p>
          </div>
          <Link
            href="/recipes/add"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            <Plus size={18} /> New Recipe
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 h-64 animate-pulse" />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center">
            <ChefHat className="text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 mb-4">
              {isAdmin ? "No recipes found on the platform yet" : "You haven't added any recipes yet"}
            </p>
            <Link
              href="/recipes/add"
              className="px-5 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              Add Your First Recipe
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className={`hidden md:grid ${gridCols} gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase`}>
              <span>Image</span>
              <span>Title</span>
              <span>Category</span>
              <span>Rating</span>
              <span>Time</span>
              {isAdmin && <span>Owner</span>}
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-gray-100">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className={`grid grid-cols-1 ${gridCols} gap-4 px-6 py-4 items-center`}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                    {recipe.imageUrl ? (
                      <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ChefHat className="text-gray-300" size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{recipe.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{recipe.shortDescription}</p>
                  </div>
                  <span className="text-sm text-gray-600">{recipe.category}</span>
                  <span className="text-sm text-gray-600">⭐ {recipe.averageRating.toFixed(1)}</span>
                  <span className="text-sm text-gray-600">{recipe.cookingTime} min</span>
                  {isAdmin && (
                    <span className="text-sm text-gray-600">{recipe.createdBy?.name || "—"}</span>
                  )}
                  <div className="flex items-center gap-2 md:justify-end">
                    <Link
                      href={`/recipes/${recipe._id}`}
                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-200 transition-colors"
                      title="View"
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