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
    <section id="faculty" className="py-5 bg-gray-50">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Section Title */}
        <div data-aos="fade-up" className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Academic Faculties
          </h2>
          <div className="w-full h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto"></div>
          <p className="text-gray-600 mt-2 mx-auto text-left">
            Explore our diverse range of academic faculties offering world-class
            education across multiple disciplines
          </p>
        </div>

        {/* Faculties Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">
            Loading faculties...
          </div>
        ) : faculties.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No faculties available
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculties.map((faculty, index) => (
                <div
                  key={faculty.id}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{faculty.icon || "🎓"}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {faculty.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faculty.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Statistics Section */}
        {faculties.length > 0 && (
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="mt-16 bg-linear-to-r from-blue-600 to-blue-500 rounded-xl p-8 text-white shadow-lg"
          >
            <div className="flex justify-center items-center">
              <div>
                <div className="text-4xl font-bold mb-2 text-center">
                  {faculties.length}
                </div>
                <p className="text-blue-100 text-center">Academic Faculties</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
