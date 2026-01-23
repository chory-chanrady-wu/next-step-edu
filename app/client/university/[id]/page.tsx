"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

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
  duration: string;
  university_id: string;
}

export default function UniversityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [university, setUniversity] = useState<University | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch university
        const uniResponse = await fetch(
          `http://localhost:3001/universities/${id}`,
        );
        if (!uniResponse.ok) {
          throw new Error("Failed to fetch university");
        }
        const uniData = await uniResponse.json();
        setUniversity(uniData);

        // Fetch programs for this university
        const progResponse = await fetch(
          `http://localhost:3001/programs?university_id=${id}`,
        );
        if (progResponse.ok) {
          const progData = await progResponse.json();
          setPrograms(progData);
        }

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
      {/* Cover Image */}
      <div className="relative h-96 bg-gray-200 overflow-hidden">
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

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header with Logo */}
          <div className="flex gap-8 mb-8">
            {/* Logo */}
            {university.logo_url && (
              <div className="w-32 h-32 shrink-0 bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200">
                <img
                  src={university.logo_url}
                  alt={`${university.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title and Basic Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {university.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4 flex items-center gap-2">
                📍 {university.city}, {university.country}
              </p>
              <p className="text-gray-700 mb-6 max-w-2xl">
                {university.short_description}
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-3xl ${
                        i < (university.tuition_rank || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Tuition Rank: {university.tuition_rank || "N/A"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {university.official_website && (
                  <a
                    href={university.official_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Visit Official Website
                  </a>
                )}
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  ← Back to Listing
                </button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mb-8">
              {university.description}
            </p>
          </div>

          {/* Programs Section */}
          {programs.length > 0 && (
            <div className="border-t pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Programs ({programs.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {program.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      📅 Duration: {program.duration}
                    </p>
                    <p className="text-gray-700">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="border-t pt-12 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <p className="text-gray-700 mb-4">
                Interested in studying at {university.name}?
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Request Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
