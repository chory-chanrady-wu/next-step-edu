"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchUniversityById,
  fetchProgramsByUniversity,
} from "../../../lib/api";
import DetailHero from "../../components/university/detailhero";
import DetailAbout from "../../components/university/detailabout";
import DetailFaculty from "../../components/university/detailfaculty";
import DetailPrograms from "../../components/university/detailprograms";
import DetailContact from "../../components/university/detailcontact";
import DetailNavigation from "../../components/university/detailnavigation";

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
}

interface Program {
  id: string;
  name: string;
  description: string;
  degree_level: number;
  exam_required: boolean;
  tuition_fee_amount: number;
  currency: string;
  study_period_months: number;
  university_id: string;
  faculty_id: string;
}

export default function UniversityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [university, setUniversity] = useState<University | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const uniData = await fetchUniversityById(id);
        setUniversity(uniData);

        const progData = await fetchProgramsByUniversity(id);
        setPrograms(progData);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="p-8">
        <div className="text-center text-gray-500 py-12">
          Loading university details...
        </div>
      </main>
    );
  }

  if (error || !university) {
    return (
      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error || "University not found"}
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <DetailHero
        university={{
          id: university.id,
          name: university.name,
          location: `${university.city}, ${university.country}`,
          description: university.description,
          logo: university.logo_url || "",
          cover_image: university.cover_image_url || "",
          tuition_rank: university.tuition_rank || 0,
          programs_count: programs.length,
        }}
      />

      {/* Sticky Navigation */}
      <DetailNavigation />

      {/* Main Content */}
      <DetailAbout description={university.description} />
      <DetailFaculty
        universityId={university.id}
        universityName={university.name}
      />
      <DetailPrograms programs={programs} />
      <DetailContact
        universityId={university.id}
        officialWebsite={university.official_website}
        location={`${university.city}, ${university.country}`}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50 group"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </main>
  );
}
