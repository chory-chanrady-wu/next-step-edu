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

        {/* Programs Table */}
        <div
          data-aos="fade-up"
          className="overflow-x-auto bg-white rounded-lg shadow-lg"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-linear-to-r from-blue-900 to-blue-700 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Program Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Degree Level
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Tuition Fee
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Entrance Exam
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr
                  key={program.id}
                  data-aos="fade-up"
                  data-aos-delay={`${100 + index * 50}`}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {program.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                      {getDegreeLabel(program.degree_level)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatDuration(program.study_period_months)}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {program.currency} $
                    {program.tuition_fee_amount.toLocaleString()}/year
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                        program.exam_required
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {program.exam_required ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs">
                    <p className="line-clamp-2">{program.description}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
