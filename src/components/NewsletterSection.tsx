"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing! Check your inbox soon.");
    setEmail("");
  };

  return (
    <section className="bg-orange-600 py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Mail className="mx-auto text-white mb-4" size={36} />
        <h2 className="text-3xl font-bold text-white mb-2">Get New Recipes in Your Inbox</h2>
        <p className="text-orange-100 mb-8">
          Subscribe to receive weekly picks of the best new recipes from our community.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}