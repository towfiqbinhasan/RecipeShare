import { Clock, Users, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Filter recipes by cooking time to find something that fits your schedule.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Every recipe is shared and reviewed by real home cooks, not brands.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Reviews",
    description: "Ratings come only from users who have an account, keeping feedback honest.",
  },
  {
    icon: Sparkles,
    title: "Fresh Ideas Daily",
    description: "New recipes are added every day across every category imaginable.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-orange-50/60 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Cooks Love RecipeShare</h2>
          <p className="text-gray-600">Everything you need to cook with confidence</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                <f.icon className="text-orange-600" size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}