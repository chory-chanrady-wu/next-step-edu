"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllUniversities, getAllScholarships } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import type {
  UniversityResponse,
  ScholarshipResponse,
} from "../../../types/nextstepedu";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  // Fetch all universities
  const { data: universities = [], isLoading: loadingUnis } = useQuery<
    UniversityResponse[]
  >({
    queryKey: ["universities-all"],
    queryFn: getAllUniversities,
  });

  // Fetch all scholarships (not paginated)
  const { data: scholarshipsPage, isLoading: loadingScholarships } = useQuery({
    queryKey: ["scholarships-all"],
    queryFn: () => getAllScholarships(),
  });

  const scholarships: ScholarshipResponse[] = scholarshipsPage?.content || [];

  // Filter universities
  const filteredUnis = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      (u.city && u.city.toLowerCase().includes(q)) ||
      (u.country && u.country.toLowerCase().includes(q)),
  );

  // Filter scholarships
  const filteredScholarships = scholarships.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q)),
  );

  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2 text-gray-800">
          Search Results
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          You searched for:{" "}
          <span className="font-semibold text-primary">{q}</span>
        </p>

        {loadingUnis || loadingScholarships ? (
          <div className="flex justify-center items-center h-40 text-lg text-gray-500">
            Loading...
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Universities
            </h2>
            {filteredUnis.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                No universities found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredUnis.map((u) => (
                  <div
                    key={u.id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                  >
                    {/* Cover Image */}
                    {u.coverImageUrl ? (
                      <Image
                        src={u.coverImageUrl}
                        alt={u.name}
                        width={400}
                        height={160}
                        className="w-full h-40 object-cover"
                        style={{ objectFit: "cover" }}
                        priority={false}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Logo and Name */}
                      <div className="flex items-center gap-3 mb-2">
                        {u.logoUrl && (
                          <Image
                            src={u.logoUrl}
                            alt="logo"
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded shadow border bg-white -mt-10"
                            style={{ marginBottom: "-1.5rem" }}
                            priority={false}
                          />
                        )}
                        <span className="text-lg font-bold text-gray-800 leading-tight">
                          {u.name}
                        </span>
                      </div>
                      {/* Location */}
                      {u.city || u.country ? (
                        <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                          <span role="img" aria-label="location">
                            📍
                          </span>
                          {u.city}
                          {u.city && u.country ? ", " : ""}
                          {u.country}
                        </div>
                      ) : null}
                      {/* Description */}
                      {u.description && (
                        <div className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {u.description}
                        </div>
                      )}
                      {/* Status and Button */}
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold lowercase">
                          active
                        </span>
                        <Link
                          href={`/client/university/${u.id}`}
                          className="ml-2 px-4 py-1.5 rounded bg-gray-100 hover:bg-primary/10 text-gray-700 text-sm font-medium transition"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Scholarships
            </h2>
            {filteredScholarships.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 flex flex-col text-gray-400 text-center py-8">
                No scholarships found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredScholarships.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                  >
                    {/* Cover Image */}
                    {s.coverImageUrl ? (
                      <Image
                        src={s.coverImageUrl}
                        alt={s.name}
                        width={400}
                        height={160}
                        className="w-full h-40 object-cover"
                        style={{ objectFit: "cover" }}
                        priority={false}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Logo and Name */}
                      <div className="flex items-center gap-3 mb-2">
                        {s.logoUrl && (
                          <Image
                            src={s.logoUrl}
                            alt="logo"
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded shadow border bg-white -mt-10"
                            style={{ marginBottom: "-1.5rem" }}
                            priority={false}
                          />
                        )}
                        <span className="text-lg font-bold text-gray-800 leading-tight">
                          {s.name}
                        </span>
                      </div>
                      {/* Description */}
                      {s.description && (
                        <div className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {s.description}
                        </div>
                      )}
                      {/* Status and Button */}
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold lowercase">
                          {s.status || "active"}
                        </span>
                        <Link
                          href={`/client/scholarship/${s.id}`}
                          className="ml-2 px-4 py-1.5 rounded bg-gray-100 hover:bg-primary/10 text-gray-700 text-sm font-medium transition"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
