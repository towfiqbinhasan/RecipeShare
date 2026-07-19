"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Menu, X, ChefHat } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Explore" },
    { href: "/about", label: "About" },
  ];

  const userLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Explore" },
    { href: "/recipes/add", label: "Add Recipe" },
    { href: "/recipes/manage", label: "Manage Recipes" },
    { href: "/about", label: "About" },
  ];

  const adminLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Explore" },
    { href: "/admin/recipes", label: "Manage Recipes" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/about", label: "About" },
  ];

  const links = user ? (user.role === "admin" ? adminLinks : userLinks) : loggedOutLinks;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-600">
            <ChefHat size={28} />
            RecipeShare
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <span className="px-2.5 py-1 rounded-full bg-gray-900 text-white text-xs font-semibold">
                    Admin
                  </span>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-orange-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-orange-600"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                {user.role === "admin" && (
                  <span className="w-fit px-2.5 py-1 rounded-full bg-gray-900 text-white text-xs font-semibold">
                    Admin
                  </span>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-left text-sm font-medium text-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-700">
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-sm font-medium text-orange-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}