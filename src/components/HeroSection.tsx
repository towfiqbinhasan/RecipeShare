"use client";

import Link from "next/link";
import { Search, ChefHat, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/recipes?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-[60vh] md:min-h-[65vh] flex items-center overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-5">
            <ChefHat size={16} /> Join 12,000+ home cooks
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Discover recipes worth <span className="text-orange-600">sharing</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Find delicious recipes from home cooks around the world, share your own creations, and rate your favorites.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for pasta, curry, cake..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-orange-500 text-orange-500" />
              <span className="font-semibold text-gray-800">4.8/5</span> average rating
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-200 to-amber-300 shadow-xl flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80"
              alt="A colorful bowl of freshly prepared food"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <ChefHat className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">2,400+ Recipes</p>
              <p className="text-xs text-gray-500">and growing daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}