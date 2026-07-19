import Link from "next/link";
import { Star, Clock, ChefHat } from "lucide-react";
import { Recipe } from "@/types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const authorName =
    typeof recipe.createdBy === "object" ? recipe.createdBy.name : "Unknown";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={recipe.imageUrl || FALLBACK_IMAGE}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
            {recipe.category}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {recipe.difficulty}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
          {recipe.shortDescription}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {recipe.cookingTime} min
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-orange-500 text-orange-500" />
            {recipe.averageRating ? recipe.averageRating.toFixed(1) : "New"}
          </span>
          <span className="flex items-center gap-1">
            <ChefHat size={14} /> {authorName}
          </span>
        </div>

        <Link
          href={`/recipes/${recipe._id}`}
          className="text-center w-full py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}