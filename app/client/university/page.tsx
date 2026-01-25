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
      {/* Contents Component */}
      <Contents
        universities={sortedUniversities}
        loading={loading}
        error={error}
      />
    </main>
  );
}
