"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchFacultiesByUniversity } from "../../../lib/api";

interface Faculty {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

interface DetailFacultyProps {
  universityId: string;
  universityName: string;
}

export default function DetailFaculty({ universityId }: DetailFacultyProps) {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const data = await fetchFacultiesByUniversity(universityId);
        setFaculties(data);
      } catch (error) {
        console.error("Failed to load faculties:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFaculties();
  }, [universityId]);

  return (
    <section id="faculty" className="py-3 bg-gray-50">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Section Title */}
        <div data-aos="fade-up" className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Academic Faculties
          </h2>
          <div className="w-full h-1 bg-linear-to-r from-teal-600 to-teal-400 mx-auto"></div>
          <p className="text-gray-600 mt-1 mx-auto text-left text-sm">
            Explore our diverse range of academic faculties offering world-class
            education across multiple disciplines
          </p>
        </div>

        {/* Faculties Table */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">
            Loading faculties...
          </div>
        ) : faculties.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No faculties available
          </div>
        ) : (
          <div
            data-aos="fade-up"
            className="overflow-x-auto bg-white rounded-lg shadow-lg"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-linear-to-r from-teal-900 to-teal-700 text-white">
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Icon
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Faculty Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((faculty, index) => (
                  <tr
                    key={faculty.id}
                    data-aos="fade-up"
                    data-aos-delay={`${index * 100}`}
                    className="border-b border-gray-200 hover:bg-teal-50 transition-colors"
                  >
                    <td className="px-4 py-2">
                      <div className="text-2xl">{faculty.icon || "🎓"}</div>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm font-bold text-gray-900">
                        {faculty.name}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600 text-sm">
                      {faculty.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Statistics Section */}
        {faculties.length > 0 && (
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="mt-8 bg-linear-to-r from-teal-600 to-teal-400 rounded-xl p-4 text-white shadow-lg"
          >
            <div className="flex justify-center items-center">
              <div>
                <div className="text-3xl font-bold mb-1 text-center">
                  {faculties.length}
                </div>
                <p className="text-teal-100 text-center text-sm">
                  Academic Faculties
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
