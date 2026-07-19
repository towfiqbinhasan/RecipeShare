"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";
import { ChefHat, Plus, X } from "lucide-react";

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Appetizer", "Drinks"];

export default function AddRecipePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [category, setCategory] = useState(categories[0]);
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to /login if not logged in
 useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast.error("Please log in to add a recipe");
        router.push("/login");
      } else if (user.role === "admin") {
        toast.error("Admin cannot add recipes");
        router.push("/admin/recipes");
      }
    }
  }, [authLoading, user, router]);

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredientField = () => setIngredients([...ingredients, ""]);

  const removeIngredientField = (index: number) => {
    if (ingredients.length === 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanedIngredients = ingredients.map((i) => i.trim()).filter(Boolean);

    if (!title || !shortDescription || !fullDescription || !category || !cookingTime) {
      setError("Please fill in all required fields");
      return;
    }
    if (cleanedIngredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }
    if (Number(cookingTime) <= 0) {
      setError("Cooking time must be a valid number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          shortDescription,
          fullDescription,
          ingredients: cleanedIngredients,
          category,
          cookingTime: Number(cookingTime),
          difficulty,
          imageUrl,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        router.push("/recipes/manage");
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch {
      setError("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user || user.role === "admin") {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-orange-50 via-white to-orange-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center mb-3">
              <ChefHat className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Add a New Recipe</h1>
            <p className="text-gray-500 text-sm mt-1">Share your favorite recipe</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Recipe Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Chicken Biryani"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description *</label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="One-line description of the recipe"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description *</label>
              <textarea
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Write the step-by-step cooking process"
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ingredients *</label>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredientField(index)}
                        className="px-3 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addIngredientField}
                className="mt-2 flex items-center gap-1 text-orange-600 text-sm font-medium hover:text-orange-700"
              >
                <Plus size={16} /> Add Another Ingredient
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cooking Time (minutes) *</label>
                <input
                  type="number"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  placeholder="30"
                  min={1}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
              <div className="flex gap-3">
                {(["Easy", "Medium", "Hard"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      difficulty === d
                        ? "bg-orange-600 text-white border-orange-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL (optional)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-orange-600 text-white font-medium text-sm hover:bg-orange-700 transition-colors disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Recipe"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}