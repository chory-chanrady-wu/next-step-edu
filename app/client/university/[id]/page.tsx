"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useProgramsByUniversity,
  useUniversityById,
} from "@/hooks/use-queries-hook";
import DetailHero from "../../components/university/detailhero";
import DetailFaculty from "../../components/university/detailfaculty";
import DetailPrograms from "../../components/university/detailprograms";
import DetailContact from "../../components/university/detailcontact";
import Footer from "@/app/components/common/Footer";
import type { ProgramResponse, UniversityResponse } from "@/types/nextstepedu";

interface ProgramViewModel {
  id: string;
  name: string;
  description: string;
  degree_level?: number;
  degree_level_name?: string;
  exam_required?: boolean;
  tuition_fee_amount?: number;
  currency?: string;
  study_period_months?: number;
  university_id?: string;
  faculty_id?: string;
}

export default function UniversityDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [showBackToTop, setShowBackToTop] = useState(false);

  // Helper function to convert degree level number to name
  const getDegreeLevelName = (level?: number): string => {
    switch (level) {
      case 1:
        return "Associate Degree";
      case 2:
        return "Bachelor's Degree";
      case 3:
        return "Master's Degree";
      case 4:
        return "Doctoral Degree";
      case 5:
        return "Certificate";
      default:
        return "N/A";
    }
  };

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

  const {
    data: university,
    isLoading: isUniversityLoading,
    isError: isUniversityError,
    error: universityError,
  } = useUniversityById(id);
  const {
    data: programs = [],
    isLoading: isProgramsLoading,
    isError: isProgramsError,
    error: programsError,
  } = useProgramsByUniversity(id);
  const isLoading = isUniversityLoading || isProgramsLoading;
  const hasError = isUniversityError || isProgramsError;

  // Debug: Log the raw API response
  console.log('Raw programs from API:', programs);

  const mappedPrograms: ProgramViewModel[] = (
    programs as ProgramResponse[]
  ).map((program) => {
    console.log('Program:', program.name, {
      degreeLevel: program.degreeLevel || program.degree_level,
      tuitionFee: program.tuitionFee || program.tuition_fee_amount,
      currency: program.currency,
      studyPeriodMonths: program.studyPeriodMonths || program.study_period_months,
      examRequired: program.examRequired ?? program.exam_required,
    });
    return {
      id: String(program.id),
      name: program.name,
      description: program.description ?? "",
      degree_level: program.degreeLevel ?? program.degree_level,
      degree_level_name: getDegreeLevelName(program.degreeLevel ?? program.degree_level),
      exam_required: program.examRequired ?? program.exam_required ?? false,
      tuition_fee_amount: program.tuitionFee ?? program.tuition_fee_amount ?? undefined,
      currency: program.currency ?? "USD",
      study_period_months: program.studyPeriodMonths ?? program.study_period_months ?? undefined,
      university_id: program.universityId ?? program.university_id
        ? String(program.universityId ?? program.university_id)
        : undefined,
      faculty_id: program.facultyId ?? program.faculty_id
        ? String(program.facultyId ?? program.faculty_id)
        : undefined,
    };
  });

  const uniData = university as UniversityResponse | undefined;
  const fallbackCoverImage = "/window.svg";
  const fallbackLogoImage = "/globe.svg";
  const errorMessage =
    (universityError instanceof Error && universityError.message) ||
    (programsError instanceof Error && programsError.message) ||
    "Failed to load university details.";

  if (isLoading || hasError || !uniData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
        {hasError && (
          <div className="max-w-xl text-center text-sm text-gray-600">
            {errorMessage}
          </div>
        )}
      </main>
    );
  }

  return (
    <main>
      <DetailHero
        university={{
          id: String(uniData.id),
          name: uniData.name,
          location: `${uniData.city || ""}, ${uniData.country || ""}`.replace(
            /^,\s*|,\s*$/g,
            "",
          ),
          description: uniData.description ?? "",
          logo: uniData.logoUrl || fallbackLogoImage,
          cover_image: uniData.coverImageUrl || fallbackCoverImage,
          tuition_rank: 0,
          programs_count: mappedPrograms.length,
        }}
      />

      {/* Sticky Navigation */}
      {/* <DetailNavigation /> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gray-50">
        <div className="lg:col-span-2 *:px-4 md:px-5 lg:px-5 py-6">
          <DetailFaculty
            universityId={String(uniData.id)}
            universityName={uniData.name}
          />
          <DetailPrograms programs={mappedPrograms} />
        </div>

        {/* Right Side - Sticky Contact */}
        <div className="lg:sticky lg:top-24 lg:h-fit lg:col-span-1 scale-90 lg:scale-100 origin-top-right">
          <DetailContact
            universityId={String(uniData.id)}
            officialWebsite={uniData.officialWebsite}
            location={`${uniData.city || ""}, ${uniData.country || ""}`.replace(
              /^,\s*|,\s*$/g,
              "",
            )}
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
