import Link from "next/link";

const categories = [
  { name: "Breakfast", emoji: "🍳", color: "bg-amber-100" },
  { name: "Main Course", emoji: "🍛", color: "bg-orange-100" },
  { name: "Desserts", emoji: "🍰", color: "bg-pink-100" },
  { name: "Vegan", emoji: "🥗", color: "bg-green-100" },
  { name: "Soups", emoji: "🍲", color: "bg-red-100" },
  { name: "Baking", emoji: "🍞", color: "bg-yellow-100" },
];

export default function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse by Category</h2>
        <p className="text-gray-600">Find recipes that match your craving</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/recipes?category=${encodeURIComponent(cat.name)}`}
            className={`${cat.color} rounded-2xl p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform`}
          >
            <span className="text-3xl">{cat.emoji}</span>
            <span className="text-sm font-medium text-gray-800">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}