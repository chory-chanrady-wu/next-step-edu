"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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

interface ContentsProps {
  universities: University[];
  loading: boolean;
  error: string | null;
  viewMode?: "grid" | "list";
}

export default function Contents({
  universities,
  loading,
  error,
  viewMode = "grid",
}: ContentsProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section id="universities" className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            data-aos="fade-up"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 py-12">
            Loading universities...
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No universities found.
          </div>
        ) : (
          <>
            {/* Universities Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map((university, index) => (
                  <div
                    key={university.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay={`${index * 50}`}
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

                        {/* Visit Buttons */}
                        <div className="flex gap-2">
                          <Link
                            href={`/client/university/${university.id}`}
                            className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            View Details
                          </Link>

                          {university.official_website && (
                            <a
                              href={university.official_website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center bg-gray-100 text-gray-900 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                              Official Site
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Universities List View */
              <div className="space-y-4">
                {universities.map((university, index) => (
                  <div
                    key={university.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay={`${index * 30}`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="relative w-full md:w-64 h-48 bg-gray-200 shrink-0">
                        {university.cover_image_url ? (
                          <img
                            src={university.cover_image_url}
                            alt={university.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-blue-400 to-teal-400" />
                        )}
                        {university.logo_url && (
                          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-white">
                            <img
                              src={university.logo_url}
                              alt={`${university.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {university.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 flex items-center">
                              📍 {university.city}, {university.country}
                            </p>
                            <p className="text-gray-700 mb-4">
                              {university.short_description}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-6 mb-4">
                              <div className="flex items-center gap-2">
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
                              <span className="text-sm bg-blue-100 px-3 py-1 rounded-full text-blue-700 font-medium">
                                {university.programs_count || 0} Programs
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Link
                              href={`/client/university/${university.id}`}
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                              View Details
                            </Link>
                            {university.official_website && (
                              <a
                                href={university.official_website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                              >
                                Official Site →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
