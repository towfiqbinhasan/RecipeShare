"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    toast.success("Your message has been sent. We'll get back to you soon!");
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h1>
          <p className="text-gray-600 mb-8">
            Have a question, suggestion, or issue? Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Mail size={18} className="text-orange-600" />
              </div>
              support@recipeshare.com
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Phone size={18} className="text-orange-600" />
              </div>
              +880 1234-567890
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin size={18} className="text-orange-600" />
              </div>
              Dhaka, Bangladesh
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write your message..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors disabled:opacity-60"
          >
            <Send size={16} />
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}