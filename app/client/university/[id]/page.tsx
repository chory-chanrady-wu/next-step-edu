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
import Footer from "@/app/components/common/Footer";

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
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">
            Loading university details...
          </p>
        </div>
      </main>
    );
  }

  if (error || !university) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">⚠️</div>
              <h3 className="text-lg font-bold text-gray-900">Error</h3>
            </div>
            <p className="text-gray-600 mb-6">
              {error || "University not found"}
            </p>
            <button
              onClick={() => router.back()}
              className="w-full px-6 py-3 bg-linear-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
            >
              ← Go Back
            </button>
          </div>
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
      {/* <DetailAbout description={university.description} /> */}
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
          className="fixed bottom-8 right-8 bg-linear-to-r from-teal-600 to-teal-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 group backdrop-blur-sm"
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
      <Footer />
    </main>
  );
}
