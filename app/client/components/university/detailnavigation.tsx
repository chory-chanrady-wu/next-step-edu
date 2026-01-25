"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DetailNavigation() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "faculty", "programs", "contact"];
      const scrollPosition = window.scrollY + 200;

      let found = false;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            found = true;
            break;
          }
        }
      }

      if (!found) {
        setActiveSection("overview");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on mount to set initial active section
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "overview", label: "Overview", icon: "📖" },
    { id: "faculty", label: "Faculty", icon: "ℹ️" },
    { id: "programs", label: "Programs", icon: "🎓" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust for sticky nav height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky backdrop-blur-2xl top-15 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "border-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-gray-900"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline text-sm md:text-base">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
