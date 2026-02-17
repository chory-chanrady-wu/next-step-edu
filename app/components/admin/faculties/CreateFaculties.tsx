// app/admin/faculties/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  MoreVertical,
  Building,
  Users,
  BookOpen,
  Download,
  Upload,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Faculty {
  id: string;
  university_id: string;
  name: string;
  description: string;
  dean?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  established_year?: number;
  total_students?: number;
  total_programs?: number;
  research_centers?: number;
  status: "active" | "inactive" | "pending";
  created_at: string;
  updated_at: string;
}

export default function AdminFacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [filteredFaculties, setFilteredFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [deletingFaculty, setDeletingFaculty] = useState<Faculty | null>(null);

  // Mock data - replace with API call
  const mockFaculties: Faculty[] = useMemo(
    () => [
      {
        id: "b2000001-0000-4000-8000-000000000001",
        university_id: "a1000000-0000-4000-8000-000000000001",
        name: "Faculty of Computer Science",
        description: "Software, AI and data systems.",
        dean: "Prof. Dr. Sarah Johnson",
        email: "cs-faculty@university.edu",
        phone: "+1 (555) 123-4567",
        website: "https://cs.university.edu",
        location: "Computer Science Building, Floor 3",
        established_year: 1995,
        total_students: 1200,
        total_programs: 8,
        research_centers: 5,
        status: "active",
        created_at: "2023-01-15T10:30:00Z",
        updated_at: "2023-12-01T14:20:00Z",
      },
      // ... other mock faculties (same as original)
    ],
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      setFaculties(mockFaculties);
      setFilteredFaculties(mockFaculties);
      setLoading(false);
    }, 500);
  }, [mockFaculties]);

  useEffect(() => {
    const result = faculties.filter((faculty) => {
      const matchesSearch =
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.dean?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || faculty.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      let aValue: string | number, bValue: string | number;

      switch (sortBy) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "students":
          aValue = a.total_students || 0;
          bValue = b.total_students || 0;
          break;
        case "programs":
          aValue = a.total_programs || 0;
          bValue = b.total_programs || 0;
          break;
        case "established":
          aValue = a.established_year || 0;
          bValue = b.established_year || 0;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredFaculties(result);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy, sortOrder, faculties]);

  const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaculties = filteredFaculties.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    if (selectedFaculties.length === currentFaculties.length) {
      setSelectedFaculties([]);
    } else {
      setSelectedFaculties(currentFaculties.map((f) => f.id));
    }
  };

  const handleSelectFaculty = (id: string) => {
    if (selectedFaculties.includes(id)) {
      setSelectedFaculties(selectedFaculties.filter((facultyId) => facultyId !== id));
    } else {
      setSelectedFaculties([...selectedFaculties, id]);
    }
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setEditingFaculty(faculty);
    setShowEditModal(true);
  };

  const handleDeleteFaculty = (faculty: Faculty) => {
    setDeletingFaculty(faculty);
    setShowDeleteModal(true);
  };

  const confirmDeleteFaculty = () => {
    if (deletingFaculty) {
      setFaculties(faculties.filter((f) => f.id !== deletingFaculty.id));
      setShowDeleteModal(false);
      setDeletingFaculty(null);
    }
  };

  const toggleStatus = (id: string) => {
    setFaculties(
      faculties.map((faculty) => {
        if (faculty.id === id) {
          const newStatus = faculty.status === "active" ? "inactive" : "active";
          return { ...faculty, status: newStatus };
        }
        return faculty;
      }),
    );
  };

  const bulkDelete = () => {
    setFaculties(faculties.filter((f) => !selectedFaculties.includes(f.id)));
    setSelectedFaculties([]);
  };

  const bulkToggleStatus = (status: "active" | "inactive") => {
    setFaculties(
      faculties.map((faculty) => {
        if (selectedFaculties.includes(faculty.id)) {
          return { ...faculty, status };
        }
        return faculty;
      }),
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-emerald-50 text-emerald-700",
      inactive: "bg-rose-50 text-rose-700",
      pending: "bg-amber-50 text-amber-700",
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || "bg-gray-100 text-gray-700"}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Faculties</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage university faculties and programs
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload size={16} />
                Import
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Download size={16} />
                Export
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus size={16} />
                Add Faculty
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Faculties</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{faculties.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {faculties.filter((f) => f.status === "active").length}
                </p>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {faculties.reduce((sum, f) => sum + (f.total_students || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Programs</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {faculties.reduce((sum, f) => sum + (f.total_programs || 0), 0)}
                </p>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Toolbar */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search faculties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="students">Students</option>
                  <option value="programs">Programs</option>
                  <option value="established">Established</option>
                  <option value="status">Status</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOrder === "asc" ? "A → Z" : "Z → A"}
                </button>
                <button
                  onClick={() => {
                    setFaculties(mockFaculties);
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Reset filters"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedFaculties.length > 0 && (
            <div className="px-4 py-3 bg-blue-50 border-t border-blue-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">{selectedFaculties.length} selected</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => bulkToggleStatus("active")}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => bulkToggleStatus("inactive")}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={bulkDelete}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedFaculties([])}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                        <input
                          type="checkbox"
                          checked={selectedFaculties.length === currentFaculties.length && currentFaculties.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dean</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentFaculties.map((faculty) => (
                      <tr
                        key={faculty.id}
                        className={`hover:bg-gray-50 transition-colors ${selectedFaculties.includes(faculty.id) ? "bg-blue-50/50" : ""}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedFaculties.includes(faculty.id)}
                            onChange={() => handleSelectFaculty(faculty.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{faculty.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{faculty.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{faculty.dean || "—"}</div>
                          {faculty.email && <div className="text-xs text-gray-500">{faculty.email}</div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{faculty.total_students?.toLocaleString() || "0"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{faculty.total_programs || "0"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(faculty.status)}
                            <button
                              onClick={() => toggleStatus(faculty.id)}
                              className={`p-1 rounded ${faculty.status === "active" ? "text-rose-600 hover:bg-rose-50" : "text-emerald-600 hover:bg-emerald-50"}`}
                              title={faculty.status === "active" ? "Deactivate" : "Activate"}
                            >
                              {faculty.status === "active" ? <X size={14} /> : <Check size={14} />}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.established_year || "—"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(faculty.updated_at)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditFaculty(faculty)}
                              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteFaculty(faculty)}
                              className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                              <MoreVertical size={16} />
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No faculties found</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Get started by adding your first faculty"}
                  </p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus size={16} />
                    Add Faculty
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {filteredFaculties.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1}–{Math.min(endIndex, filteredFaculties.length)} of {filteredFaculties.length}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`p-2 rounded ${currentPage === 1 ? "text-gray-300" : "text-gray-500 hover:bg-gray-100"}`}
              >
                <ChevronsLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded ${currentPage === 1 ? "text-gray-300" : "text-gray-500 hover:bg-gray-100"}`}
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 text-sm rounded ${currentPage === pageNum ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${currentPage === totalPages ? "text-gray-300" : "text-gray-500 hover:bg-gray-100"}`}
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${currentPage === totalPages ? "text-gray-300" : "text-gray-500 hover:bg-gray-100"}`}
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Add New Faculty</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name *</label>
                    <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Faculty of Computer Science" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dean's Name</label>
                    <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Prof. Dr. John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="faculty@university.edu" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input type="url" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://faculty.university.edu" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                    <input type="number" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1995" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Students</label>
                    <input type="number" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Programs</label>
                    <input type="number" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="8" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief description of the faculty..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Building, Room Number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Create Faculty
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Faculty Modal */}
      {showEditModal && editingFaculty && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Edit Faculty</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name *</label>
                    <input type="text" defaultValue={editingFaculty.name} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dean's Name</label>
                    <input type="text" defaultValue={editingFaculty.dean} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" defaultValue={editingFaculty.email} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" defaultValue={editingFaculty.phone} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input type="url" defaultValue={editingFaculty.website} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                    <input type="number" defaultValue={editingFaculty.established_year} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Students</label>
                    <input type="number" defaultValue={editingFaculty.total_students} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Programs</label>
                    <input type="number" defaultValue={editingFaculty.total_programs} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea rows={3} defaultValue={editingFaculty.description} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" defaultValue={editingFaculty.location} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select defaultValue={editingFaculty.status} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingFaculty && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Faculty</h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-gray-900">{deletingFaculty.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteFaculty}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-rose-600 border border-transparent rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Import Faculties</h2>
              <button onClick={() => setShowImportModal(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop your CSV file here</p>
                <p className="text-xs text-gray-400 mb-4">or</p>
                <label className="inline-flex px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Browse Files
                  <input type="file" className="hidden" accept=".csv" />
                </label>
                <p className="text-xs text-gray-400 mt-4">Maximum file size: 5MB</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                  Download Template
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  Start Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
