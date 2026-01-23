"use client";

import { useState, useEffect } from "react";

interface University {
  id: string;
  name: string;
  city: string;
  country: string;
  short_description: string;
  description: string;
  official_website?: string;
  logo_url?: string;
  cover_image_url?: string;
  tuition_rank?: number;
  programs_count?: number;
}

export default function UniversityPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [sortBy, setSortBy] = useState("Name (A-Z)");

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/universities");
      if (!response.ok) {
        throw new Error("Failed to fetch universities");
      }
      const data = await response.json();
      setUniversities(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedUniversities = [...filteredUniversities].sort((a, b) => {
    if (sortBy === "Name (A-Z)") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Name (Z-A)") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "Rating") {
      return (b.tuition_rank || 0) - (a.tuition_rank || 0);
    }
    return 0;
  });

  const regions = ["All Regions", ...new Set(universities.map((u) => u.city))];

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-64 bg-linear-to-r from-blue-900 to-teal-600 text-white flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(30, 58, 138) 0%, rgb(13, 148, 136) 100%)",
        }}
      >
        <h1 className="text-5xl font-bold mb-4">Explore Universities</h1>
        <p className="text-xl text-gray-100">
          Discover top universities in Cambodia with detailed program
          information
        </p>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white border-b py-6 px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, location, or program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-gray-700 font-medium">All Regions</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-gray-700 font-medium">Name (A-Z)</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center text-gray-500 py-12">
              Loading universities...
            </div>
          ) : sortedUniversities.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No universities found.
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Showing {sortedUniversities.length} universities
              </p>

              {/* Universities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedUniversities.map((university) => (
                  <div
                    key={university.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    {/* Cover Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      {university.cover_image_url ? (
                        <img
                          src={university.cover_image_url}
                          alt={university.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-blue-400 to-teal-400" />
                      )}
                    </div>

                    {/* Logo and Content */}
                    <div className="p-4 relative">
                      {/* Logo */}
                      {university.logo_url && (
                        <div className="absolute -top-8 left-4 w-16 h-16 bg-white rounded-lg shadow-md overflow-hidden border-2 border-white">
                          <img
                            src={university.logo_url}
                            alt={`${university.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className={university.logo_url ? "pt-12" : ""}>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {university.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 flex items-center">
                          📍 {university.city}, {university.country}
                        </p>

                        <p className="text-sm text-gray-700 mb-4">
                          {university.short_description}
                        </p>

                        {/* Rating and Programs */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {/* Star Rating */}
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${
                                    i < (university.tuition_rank || 0)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">
                              Tuition
                            </span>
                          </div>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                            {university.programs_count || 0} Programs
                          </span>
                        </div>

                        {/* Visit Button */}
                        {university.official_website && (
                          <a
                            href={university.official_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            View Details
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
