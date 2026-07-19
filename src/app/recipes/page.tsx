"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChefHat, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

interface Recipe {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  cookingTime: number;
  difficulty: string;
  imageUrl: string;
  averageRating: number;
  createdBy: { name: string };
}

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Appetizer", "Drinks"];
const difficulties = ["Easy", "Medium", "Hard"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "time-asc", label: "Time: Low to High" },
  { value: "time-desc", label: "Time: High to Low" },
];

export default function ExploreRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (difficulty) params.set("difficulty", difficulty);
      params.set("sort", sort);
      params.set("page", String(page));
      params.set("limit", "8");

      const res = await fetch(`/api/recipes?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setRecipes(data.recipes);
        setTotalPages(data.pagination.totalPages || 1);
      }
    } catch {
      // silent fail, keep previous state
    } finally {
      setLoading(false);
    }
  }, [search, category, difficulty, sort, page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleFilterChange = (type: "category" | "difficulty" | "sort", value: string) => {
    setPage(1);
    if (type === "category") setCategory(value);
    if (type === "difficulty") setDifficulty(value);
    if (type === "sort") setSort(value);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setCategory("");
    setDifficulty("");
    setSort("newest");
    setPage(1);
  };

  const hasActiveFilters = search || category || difficulty || sort !== "newest";

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Recipes</h1>
          <p className="text-gray-500 text-sm mb-6">Choose from hundreds of delicious recipes</p>

          <form onSubmit={handleSearchSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by recipe name..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                showFilters ? "bg-orange-50 border-orange-300 text-orange-700" : "border-gray-200 text-gray-600"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </form>

          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-4">
              <select
                value={category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={difficulty}
                onChange={(e) => handleFilterChange("difficulty", e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All Difficulties</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {sortOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recipe grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="h-40 bg-gray-100 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center">
            <ChefHat className="text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No recipes found</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 px-5 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
              >
                Clear Filters and Try Again
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <Link
                  key={recipe._id}
                  href={`/recipes/${recipe._id}`}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
                >
                  <div className="h-40 bg-gray-100 relative overflow-hidden">
                    {recipe.imageUrl ? (
                      <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ChefHat className="text-gray-300" size={32} />
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-1 rounded-md bg-white/90 text-xs font-medium text-gray-700">
                      {recipe.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{recipe.title}</h3>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2 flex-1">{recipe.shortDescription}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <span>⭐ {recipe.averageRating.toFixed(1)}</span>
                      <span>{recipe.cookingTime} min</span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100">{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <span className="block w-full text-center py-2 rounded-lg bg-orange-50 text-orange-700 text-xs font-medium group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      View Details
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      page === i + 1
                        ? "bg-orange-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:border-orange-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}