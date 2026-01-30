"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import HeroSection from "../components/university/herosection";
import SearchSection from "../components/university/searchsection";
import Contents from "../components/university/contents";
import { fetchUniversities } from "../../lib/api";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchUniversitiesData();
  }, []);

  const fetchUniversitiesData = async () => {
    try {
      setLoading(true);
      const data = await fetchUniversities();
      setUniversities(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === "All Regions" || uni.city === selectedRegion;

    return matchesSearch && matchesRegion;
  });

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

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedRegion !== "All Regions" ||
    sortBy !== "Name (A-Z)";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRegion("All Regions");
    setSortBy("Name (A-Z)");
  };

  return (
    <main>
      <HeroSection />
      <SearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        sortBy={sortBy}
        setSortBy={setSortBy}
        regions={regions}
      />

      {/* Interactive Controls */}
      {!loading && !error && (
        <section className="bg-gray-50 py-4 px-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            {/* Results Count and Clear Filters */}
            <div className="flex items-center gap-4">
              <p className="text-gray-700 font-semibold">
                Showing{" "}
                <span className="text-blue-600 text-lg">
                  {sortedUniversities.length}
                </span>{" "}
                of {universities.length} universities
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:underline transition-all"
                >
                  <span>✕</span> Clear Filters
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">⊞</span> Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">☰</span> List
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Contents Component */}
      <Contents
        universities={sortedUniversities}
        loading={loading}
        error={error}
        viewMode={viewMode}
      />
    </main>
  );
}
