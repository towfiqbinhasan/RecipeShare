import { ChefHat, Users, Heart, Globe } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Registered Users", value: "10,000+", icon: Users },
    { label: "Shared Recipes", value: "5,000+", icon: ChefHat },
    { label: "Countries", value: "50+", icon: Globe },
    { label: "Total Reviews", value: "25,000+", icon: Heart },
  ];

  const team = [
    { name: "Rahim Ahmed", role: "Founder & CEO", initial: "R" },
    { name: "Sadia Islam", role: "Community Manager", initial: "S" },
    { name: "Kamal Hossain", role: "Lead Developer", initial: "K" },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center mx-auto mb-6">
            <ChefHat className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            RecipeShare is a community where home cooks share their favorite recipes,
            learn from one another, and spread the joy of cooking around the world.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We started in 2024 with a simple idea — every family has its own recipes
              that have been passed down through generations. We wanted to create a place
              where these recipes could reach everyone instead of being lost over time.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, thousands of people share their cooking experiences on our platform,
              help each other with ratings and reviews, and discover new recipes every day.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-orange-50 rounded-xl p-5 text-center">
                <stat.icon className="text-orange-600 mx-auto mb-2" size={24} />
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {member.initial}
                </div>
                <p className="font-semibold text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}