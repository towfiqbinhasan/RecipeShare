"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need an account to view recipes?",
    answer: "No, all recipes and their details are publicly viewable. You only need an account to add your own recipes or leave a rating.",
  },
  {
    question: "How do I add my own recipe?",
    answer: "Create a free account, then go to the 'Add Recipe' page from the navigation bar and fill in the details.",
  },
  {
    question: "Can I edit or delete a recipe after posting?",
    answer: "Yes, go to 'Manage Recipes' from the navbar to view and delete recipes you've submitted.",
  },
  {
    question: "How are ratings calculated?",
    answer: "Each recipe's rating is the average of all star ratings left by logged-in users in the reviews section.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">Everything you need to know</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.question} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              {faq.question}
              <ChevronDown
                size={18}
                className={`transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}