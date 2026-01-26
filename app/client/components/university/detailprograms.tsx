"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Program {
  id: string;
  name: string;
  description: string;
  degree_level: number;
  exam_required: boolean;
  tuition_fee_amount: number;
  currency: string;
  study_period_months: number;
}

interface DetailProgramsProps {
  programs: Program[];
}

export default function DetailPrograms({ programs }: DetailProgramsProps) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const getDegreeLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Certificate";
      case 2:
        return "Bachelor's";
      case 3:
        return "Master's";
      case 4:
        return "PhD";
      default:
        return "Degree";
    }
  };

  const formatDuration = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0 && remainingMonths > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else {
      return `${months} month${months > 1 ? "s" : ""}`;
    }
  };

  if (programs.length === 0) {
    return (
      <section className="py-5 md:py-5 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div data-aos="fade-up" className="text-center text-gray-500">
            <p className="text-xl">No programs available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className="py-5 md:py-5 bg-gray-50">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Section Title */}
        <div data-aos="fade-up" className="mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Available Programs
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Explore {programs.length} programs offered by this university
          </p>
          <div className="w-full h-1 bg-linear-to-r from-blue-900 to-blue-700"></div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {programs.map((program, index) => (
            <div
              key={program.id}
              data-aos="fade-up"
              data-aos-delay={`${100 + index * 50}`}
              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-blue-900 to-blue-700 p-4">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm rounded-full mb-2">
                  {getDegreeLabel(program.degree_level)}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-50 transition">
                  {program.name}
                </h3>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {program.description}
                </p>

                {/* Details */}
                <div className="">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">⏱️</span>
                    <span>
                      Duration: {formatDuration(program.study_period_months)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">💰</span>
                    <span>
                      Tuition: {program.currency} $
                      {program.tuition_fee_amount.toLocaleString()}/year
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">📝</span>
                    <span>
                      Entrance Exam Required :{" "}
                      {program.exam_required ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 px-4 py-2 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg transition-colors font-medium">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
