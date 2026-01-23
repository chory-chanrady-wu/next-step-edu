"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  website?: string;
  createdAt?: string;
}

export default function UniversityAdminPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/universities");
      if (!response.ok) {
        throw new Error("Failed to fetch universities");
      }
      const data = await response.json();
      setUniversities(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.country.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">University</h1>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search universities by name, location, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 py-8">
            Loading universities...
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No universities found.
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    University Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUniversities.map((university) => (
                  <tr key={university.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {university.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {university.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {university.country}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {university.website ? (
                        <a
                          href={university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          Showing {filteredUniversities.length} of {universities.length}{" "}
          universities
        </div>
      </div>
    </main>
  );
}
