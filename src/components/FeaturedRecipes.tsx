"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecipeCard from "./RecipeCard";
import SkeletonCard from "./SkeletonCard";
import { Recipe } from "@/types";

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes?limit=4&sort=rating");
        const data = await res.json();
        if (data.success) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Recipes</h2>
          <p className="text-gray-600">Top-rated dishes from our community</p>
        </div>
        <Link
          href="/recipes"
          className="hidden sm:block text-orange-600 font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : recipes.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-10">
            No recipes yet. Be the first to add one!
          </p>
        ) : (
          recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
        )}
      </div>
    </section>
  );
}