import Link from "next/link";
import { HelpCircle, Mail } from "lucide-react";

const faqs = [
  { q: "How do I create an account?", a: "Click 'Sign Up' in the top right corner and fill in your name, email, and password to register." },
  { q: "How do I add a recipe?", a: "Log in, then click 'Add Recipe' from the navigation bar and fill in the form." },
  { q: "Can I edit or delete my recipe?", a: "Yes, go to the 'Manage Recipes' page to delete recipes you've added." },
  { q: "How does rating work?", a: "Visit any recipe's details page and leave a rating from 1 to 5 stars along with a review." },
];

export default function HelpPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="text-orange-600 mx-auto mb-4" size={40} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
          <p className="text-gray-500">Find answers to frequently asked questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 rounded-xl p-6 mt-8 text-center">
          <p className="text-gray-700 mb-3">Need more help?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            <Mail size={16} /> Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}