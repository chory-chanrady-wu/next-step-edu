"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { UniversityResponse } from "@/types/nextstepedu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface ContentsProps {
  universities: UniversityResponse[];
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(universities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUniversities = universities.slice(startIndex, endIndex);

  // Generate pagination model with ellipsis
  const getPaginationModel = (
    page: number,
    totalPages: number,
  ): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }

    if (page >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  };

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
          <div className="text-center text-gray-500 py-12"></div>
        ) : universities.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No universities found.
          </div>
        ) : (
          <>
            {/* Universities Grid View */}
            {viewMode === "grid" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedUniversities.map((university, index) => (
                    <Link
                      key={university.id}
                      href={`/client/university/${university.id}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                      data-aos="fade-up"
                      data-aos-delay={`${index * 10}`}
                    >
                      {/* Cover Image */}
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        {university.coverImageUrl ? (
                          <img
                            src={university.coverImageUrl}
                            alt={university.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-teal-400 to-teal-500" />
                        )}
                      </div>

                      {/* Logo and Content */}
                      <div className="p-4 relative">
                        {/* Logo */}
                        {university.logoUrl && (
                          <div className="absolute -top-8 left-4 w-16 h-16 bg-white rounded-lg shadow-md overflow-hidden border-2 border-white">
                            <img
                              src={university.logoUrl}
                              alt={`${university.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className={university.logoUrl ? "pt-12" : ""}>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {university.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 flex items-center">
                            📍 {university.city || "N/A"},{" "}
                            {university.country || "N/A"}
                          </p>

                          <p className="text-sm text-gray-700 mb-4">
                            {university.description ||
                              "No description available"}
                          </p>

                          {/* Rating and Programs */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              {/* Status Badge */}
                              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                                {university.status || "Active"}
                              </span>
                            </div>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination Controls */}
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) => Math.max(prev - 1, 1));
                        }}
                        aria-disabled={currentPage === 1}
                        tabIndex={currentPage === 1 ? -1 : undefined}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>

                    {getPaginationModel(currentPage, totalPages).map(
                      (item, idx) => {
                        if (item === "ellipsis") {
                          return (
                            <PaginationItem key={`e-${idx}`}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return (
                          <PaginationItem key={item}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(item);
                              }}
                              isActive={item === currentPage}
                              size="icon"
                            >
                              {item}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      },
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          );
                        }}
                        aria-disabled={currentPage === totalPages}
                        tabIndex={currentPage === totalPages ? -1 : undefined}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
