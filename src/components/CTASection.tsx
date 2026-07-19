import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="bg-gray-900 rounded-3xl px-8 py-14 text-center">
        <ChefHat className="mx-auto text-orange-400 mb-4" size={40} />
        <h2 className="text-3xl font-bold text-white mb-3">Ready to Share Your Recipe?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Join thousands of home cooks sharing their favorite dishes. It only takes a minute to get started.
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors"
        >
          Join RecipeShare Free
        </Link>
      </div>
    </section>
  );
}