"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  regions: string[];
}

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  sortBy,
  setSortBy,
  regions,
}: SearchSectionProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <section
      className="bg-white py-8 px-4 sticky top-16 z-10"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Universities
            </label>
            <input
              type="text"
              placeholder="Search by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Name (A-Z)">Name (A-Z)</option>
              <option value="Name (Z-A)">Name (Z-A)</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
