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
  if (error || !university) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
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
      {/* <DetailNavigation /> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gray-50">
        <div className="lg:col-span-2 *:px-4 md:px-5 lg:px-5 py-6">
          <DetailFaculty
            universityId={university.id}
            universityName={university.name}
          />
          <DetailPrograms programs={programs} />
        </div>

        {/* Right Side - Sticky Contact */}
        <div className="lg:sticky lg:top-24 lg:h-fit lg:col-span-1 scale-90 lg:scale-100 origin-top-right">
          <DetailContact
            universityId={university.id}
            officialWebsite={university.official_website}
            location={`${university.city}, ${university.country}`}
          />
        </div>
      </div>

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
