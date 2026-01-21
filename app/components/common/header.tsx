import Link from "next/link";
import { routes } from "../../lib/routes";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={routes.home} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">📚</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              NextStepEdu
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href={routes.client.home}
              className="text-gray-700 hover:text-teal-600 font-medium"
            >
              Home
            </Link>
            <Link
              href={routes.client.university}
              className="text-gray-700 hover:text-teal-600 font-medium"
            >
              Universities
            </Link>
            <Link
              href={routes.client.scholarship}
              className="text-gray-700 hover:text-teal-600 font-medium"
            >
              Scholarships
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-medium">
              <span>🔓</span>
              Login
            </button>
            <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
