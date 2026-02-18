// app/admin/faculties/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building,
  MapPin,
  Globe,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface University {
  id: number;
  name: string;
  slug: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  description: string;
  country: string;
  city: string;
  officialWebsite: string | null;
  status: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  contacts: null;
}

interface Faculty {
  id: number;
  name: string;
  description: string;
  university_id: number;
  university?: University; // Joined university data
}

interface FacultyRequest {
  id?: number;
  name: string;
  description: string;
  university_id: number;
}

export default function AdminFacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [filteredFaculties, setFilteredFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [deletingFaculty, setDeletingFaculty] = useState<Faculty | null>(null);

  // Form state
  const [facultyForm, setFacultyForm] = useState<FacultyRequest>({
    name: "",
    description: "",
    university_id: 0,
  });

  // Universities list for dropdown
  const [universities, setUniversities] = useState<University[]>([]);

  // Mock data
  useEffect(() => {
    // Mock universities
    const mockUniversities: University[] = [
      {
        id: 1,
        name: "Royal University of Phnom Penh",
        slug: "rupp",
        logoUrl: null,
        coverImageUrl: null,
        description: "Cambodia's oldest and largest university",
        country: "Cambodia",
        city: "Phnom Penh",
        officialWebsite: "https://www.rupp.edu.kh",
        status: "active",
        createdAt: "2024-01-15T08:00:00Z",
        updatedAt: "2024-03-20T10:30:00Z",
        contacts: null,
      },
      {
        id: 2,
        name: "Institute of Technology of Cambodia",
        slug: "itc",
        logoUrl: null,
        coverImageUrl: null,
        description: "Leading technical institution",
        country: "Cambodia",
        city: "Phnom Penh",
        officialWebsite: "https://www.itc.edu.kh",
        status: "active",
        createdAt: "2024-02-10T09:15:00Z",
        updatedAt: "2024-03-18T14:20:00Z",
        contacts: null,
      },
      {
        id: 3,
        name: "University of Health Sciences",
        slug: "uhs",
        logoUrl: null,
        coverImageUrl: null,
        description: "Premier medical education institution",
        country: "Cambodia",
        city: "Phnom Penh",
        officialWebsite: "https://www.uhs.edu.kh",
        status: "active",
        createdAt: "2024-01-20T09:15:00Z",
        updatedAt: "2024-03-15T16:45:00Z",
        contacts: null,
      },
      {
        id: 4,
        name: "National University of Management",
        slug: "num",
        logoUrl: null,
        coverImageUrl: null,
        description: "Leading business school",
        country: "Cambodia",
        city: "Phnom Penh",
        officialWebsite: "https://www.num.edu.kh",
        status: "active",
        createdAt: "2024-02-05T10:00:00Z",
        updatedAt: "2024-03-12T13:30:00Z",
        contacts: null,
      },
    ];

    // Mock faculties with their associated university
    const mockFaculties: Faculty[] = [
      {
        id: 1,
        name: "Faculty of Engineering",
        description: "Engineering and Technology programs focusing on software, civil, and electrical engineering.",
        university_id: 1,
        university: mockUniversities[0],
      },
      {
        id: 2,
        name: "Faculty of Information Technology",
        description: "Computer science, AI, data science, and cybersecurity programs.",
        university_id: 2,
        university: mockUniversities[1],
      },
      {
        id: 3,
        name: "Faculty of Medicine",
        description: "Medical sciences, nursing, and healthcare programs.",
        university_id: 3,
        university: mockUniversities[2],
      },
      {
        id: 4,
        name: "Faculty of Business Administration",
        description: "Management, finance, marketing, and entrepreneurship.",
        university_id: 4,
        university: mockUniversities[3],
      },
      {
        id: 5,
        name: "Faculty of Architecture",
        description: "Architecture, urban planning, and design programs.",
        university_id: 1,
        university: mockUniversities[0],
      },
    ];

    setTimeout(() => {
      setUniversities(mockUniversities);
      setFaculties(mockFaculties);
      setFilteredFaculties(mockFaculties);
      setLoading(false);
    }, 500);
  }, []);

  // Filter faculties based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFaculties(faculties);
      setCurrentPage(1);
      return;
    }

    const filtered = faculties.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.university?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.university?.city?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredFaculties(filtered);
    setCurrentPage(1);
  }, [searchQuery, faculties]);

  // Pagination
  const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaculties = filteredFaculties.slice(startIndex, endIndex);

  const handleAddFaculty = () => {
    setFacultyForm({
      name: "",
      description: "",
      university_id: universities[0]?.id || 0,
    });
    setShowAddModal(true);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setEditingFaculty(faculty);
    setFacultyForm({
      id: faculty.id,
      name: faculty.name,
      description: faculty.description,
      university_id: faculty.university_id,
    });
    setShowEditModal(true);
  };

  const handleDeleteFaculty = (faculty: Faculty) => {
    setDeletingFaculty(faculty);
    setShowDeleteModal(true);
  };

  const confirmDeleteFaculty = () => {
    if (!deletingFaculty) return;
    setFaculties(faculties.filter((f) => f.id !== deletingFaculty.id));
    setShowDeleteModal(false);
    setDeletingFaculty(null);
  };

  const handleSubmitFaculty = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedUniversity = universities.find(u => u.id === facultyForm.university_id);

    if (showAddModal) {
      const newFaculty: Faculty = {
        id: Date.now(),
        name: facultyForm.name,
        description: facultyForm.description,
        university_id: facultyForm.university_id,
        university: selectedUniversity,
      };
      setFaculties([...faculties, newFaculty]);
    } else if (showEditModal && editingFaculty) {
      setFaculties(
        faculties.map((f) =>
          f.id === editingFaculty.id
            ? {
              ...f,
              name: facultyForm.name,
              description: facultyForm.description,
              university_id: facultyForm.university_id,
              university: selectedUniversity,
            }
            : f
        )
      );
    }

    setShowAddModal(false);
    setShowEditModal(false);
    setEditingFaculty(null);
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "inactive":
        return <XCircle className="w-4 h-4 text-rose-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading faculties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Faculties</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage faculties and their associated universities
              </p>
            </div>
            <button
              onClick={handleAddFaculty}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={16} />
              Add Faculty
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculties or universities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentFaculties.map((faculty) => (
                  <tr key={faculty.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {faculty.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-2 max-w-xs">
                          {faculty.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {faculty.university?.name || `University #${faculty.university_id}`}
                          </div>
                          {faculty.university?.officialWebsite && (
                            <a
                              href={faculty.university.officialWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
                            >
                              <Globe size={12} />
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>
                          {faculty.university?.city || "—"}, {faculty.university?.country || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {faculty.university?.status ? (
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(faculty.university.status)}
                          <span className="text-sm capitalize text-gray-700">
                            {faculty.university.status}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(faculty.university?.updatedAt || faculty.university?.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditFaculty(faculty)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(faculty)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {currentFaculties.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No faculties found</h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchQuery ? "Try adjusting your search" : "Get started by adding your first faculty"}
              </p>
              {!searchQuery && (
                <button
                  onClick={handleAddFaculty}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Add Faculty
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {filteredFaculties.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1}–{Math.min(endIndex, filteredFaculties.length)} of {filteredFaculties.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-1.5 rounded ${currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-1.5 rounded ${currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                {showAddModal ? "Add Faculty" : "Edit Faculty"}
              </h2>
            </div>
            <form onSubmit={handleSubmitFaculty} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Faculty Name *
                </label>
                <input
                  type="text"
                  required
                  value={facultyForm.name}
                  onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Faculty of Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={facultyForm.description}
                  onChange={(e) => setFacultyForm({ ...facultyForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the faculty..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  University *
                </label>
                <select
                  required
                  value={facultyForm.university_id}
                  onChange={(e) => setFacultyForm({ ...facultyForm, university_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a university</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingFaculty(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {showAddModal ? "Create" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingFaculty && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 text-center mb-2">
                Delete Faculty
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium text-gray-900">{deletingFaculty.name}</span>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteFaculty}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
