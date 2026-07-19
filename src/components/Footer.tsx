import Link from "next/link";
import { ChefHat, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
            <ChefHat size={26} />
            RecipeShare
          </div>
          <p className="text-sm text-gray-400">
            A community for home cooks to discover, share, and rate delicious recipes from around the world.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link href="/recipes" className="hover:text-orange-400">Explore Recipes</Link></li>
            <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/help" className="hover:text-orange-400">Help Center</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-orange-400">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm mb-4">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@recipeshare.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234-567890
            </li>
          </ul>
          <div className="flex gap-4">
            
             <a href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/>
              </svg>
            </a>
            
            <a  href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            
             <a href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-orange-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.9c-.8.3-1.6.6-2.4.7.9-.5 1.5-1.4 1.9-2.3-.8.5-1.7.8-2.7 1a4.2 4.2 0 0 0-7.2 3.8A12 12 0 0 1 2.9 4.6a4.2 4.2 0 0 0 1.3 5.6c-.7 0-1.3-.2-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1c-.6.2-1.3.2-1.9.1a4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.6a11.9 11.9 0 0 0 6.5 1.9c7.8 0 12-6.4 12-12v-.5c.8-.6 1.5-1.3 2.1-2.2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RecipeShare. All rights reserved.
      </div>
    </footer>
  );
}