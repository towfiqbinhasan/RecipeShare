import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Home Cook",
    quote: "I found my go-to biryani recipe here. The step-by-step instructions made it so easy to follow.",
    rating: 5,
  },
  {
    name: "Karim Hasan",
    role: "Food Blogger",
    quote: "The community reviews helped me pick recipes that actually work. No more guessing games in the kitchen.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Home Cook",
    quote: "Sharing my grandmother's recipes here feels great. People actually try them and leave feedback.",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Cooks Say</h2>
        <p className="text-gray-600">Real feedback from our growing community</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < t.rating ? "fill-orange-500 text-orange-500" : "text-gray-200"}
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm mb-4">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}