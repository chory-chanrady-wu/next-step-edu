"use client";

import { useState } from "react";
import HeroSection from "../components/university/herosection";
import SearchSection from "../components/university/searchsection";
import Contents from "../components/university/contents";
import { useAllUniversities } from "@/hooks/use-queries-hook";
import Footer from "@/app/components/common/Footer";

export default function UniversityPage() {
  const {
    data: universities = [],
    isLoading: loading,
    error,
  } = useAllUniversities();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [sortBy, setSortBy] = useState("Name (A-Z)");
  const [viewMode] = useState<"grid" | "list">("grid");
  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (uni.city?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesRegion =
      selectedRegion === "All Regions" || uni.city === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const sortedUniversities = [...filteredUniversities].sort((a, b) => {
    if (sortBy === "Name (A-Z)") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Name (Z-A)") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const regions = [
    "All Regions",
    ...new Set(
      universities
        .map((u) => u.city)
        .filter((city): city is string => city !== undefined),
    ),
  ];

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
          </div>
        </section>
      )}

      {/* Contents Component */}
      <Contents
        universities={sortedUniversities}
        loading={loading}
        error={error ? (error as Error).message : null}
        viewMode={viewMode}
      />

      <Footer />
    </main>
  );
}
