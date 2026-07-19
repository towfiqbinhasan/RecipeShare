"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";
import { ChefHat, Clock, Star, User, ArrowLeft } from "lucide-react";

interface Review {
  _id: string;
  user: { _id: string; name: string };
  rating: number;
  comment: string;
  createdAt: string;
}

interface RecipeDetail {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  category: string;
  cookingTime: number;
  difficulty: string;
  imageUrl: string;
  createdBy: { _id: string; name: string };
  reviews: Review[];
  averageRating: number;
  createdAt: string;
}

interface RelatedRecipe {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  averageRating: number;
}

export default function RecipeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = params.id as string;

  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [related, setRelated] = useState<RelatedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchRecipe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recipes/${id}`);
      const data = await res.json();
      if (data.success) {
        setRecipe(data.recipe);
        // related recipes: same category
        const relatedRes = await fetch(`/api/recipes?category=${encodeURIComponent(data.recipe.category)}&limit=4`);
        const relatedData = await relatedRes.json();
        if (relatedData.success) {
          setRelated(relatedData.recipes.filter((r: RelatedRecipe) => r._id !== id).slice(0, 3));
        }
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to leave a review");
      router.push("/login");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/recipes/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setReviewComment("");
        setReviewRating(5);
        fetchRecipe();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error occurred");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </main>
    );
  }

  if (notFound || !recipe) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
        <ChefHat className="text-gray-300" size={48} />
        <p className="text-gray-500">Recipe not found</p>
        <Link href="/recipes" className="text-orange-600 font-medium hover:underline">
          View All Recipes
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/recipes" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6">
          <ArrowLeft size={16} /> Back to All Recipes
        </Link>

        {/* Hero image */}
        <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-gray-100 relative mb-6">
          {recipe.imageUrl ? (
            <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ChefHat className="text-gray-300" size={64} />
            </div>
          )}
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-sm font-medium text-gray-700">
            {recipe.category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
              <p className="text-gray-500">{recipe.shortDescription}</p>

              <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  {recipe.averageRating.toFixed(1)} ({recipe.reviews.length} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} /> {recipe.cookingTime} min
                </span>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium">
                  {recipe.difficulty}
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={16} /> {recipe.createdBy?.name || "Unknown"}
                </span>
              </div>
            </div>

            {/* Description / Overview */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{recipe.fullDescription}</p>
            </div>

            {/* Key info / Specifications */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews & Ratings ({recipe.reviews.length})</h2>

              {/* Review form */}
              <form onSubmit={handleReviewSubmit} className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Your Rating</p>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={22}
                        className={star <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={user ? "Write your comment..." : "Log in to leave a review"}
                  rows={3}
                  disabled={!user}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none disabled:bg-gray-50"
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="mt-3 px-5 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors disabled:opacity-60"
                >
                  {submittingReview ? "Submitting..." : user ? "Submit Review" : "Log In"}
                </button>
              </form>

              {/* Review list */}
              {recipe.reviews.length === 0 ? (
                <p className="text-gray-400 text-sm">No reviews yet — be the first to leave one!</p>
              ) : (
                <div className="space-y-4">
                  {[...recipe.reviews].reverse().map((review) => (
                    <div key={review._id} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-sm font-medium shrink-0">
                        {review.user?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{review.user?.name || "User"}</span>
                          <span className="flex items-center gap-0.5 text-xs text-yellow-600">
                            <Star size={12} className="fill-yellow-500 text-yellow-500" /> {review.rating}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Related recipes */}
          <div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Recipes</h2>
              {related.length === 0 ? (
                <p className="text-gray-400 text-sm">No related recipes found</p>
              ) : (
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link
                      key={r._id}
                      href={`/recipes/${r._id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                        {r.imageUrl ? (
                          <Image src={r.imageUrl} alt={r.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ChefHat className="text-gray-300" size={18} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-orange-600 line-clamp-1">
                          {r.title}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Star size={10} className="fill-yellow-500 text-yellow-500" /> {r.averageRating.toFixed(1)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}