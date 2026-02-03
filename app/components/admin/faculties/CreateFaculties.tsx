// app/admin/faculties/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  MoreVertical,
  Building,
  Users,
  Calendar,
  Mail,
  Phone,
  Globe,
  Download,
  Upload,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings,
  BookOpen
} from 'lucide-react';

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
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
}

export default function AdminFacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [filteredFaculties, setFilteredFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [deletingFaculty, setDeletingFaculty] = useState<Faculty | null>(null);

  // Mock data - replace with API call
  const mockFaculties: Faculty[] = [
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
      updated_at: "2023-12-01T14:20:00Z"
    },
    {
      id: "b2000002-0000-4000-8000-000000000002",
      university_id: "a1000000-0000-4000-8000-000000000001",
      name: "Faculty of Engineering",
      description: "Civil, mechanical and electrical engineering programs.",
      dean: "Prof. Dr. Michael Chen",
      email: "engineering@university.edu",
      phone: "+1 (555) 234-5678",
      website: "https://engineering.university.edu",
      location: "Engineering Complex, Building A",
      established_year: 1980,
      total_students: 1800,
      total_programs: 12,
      research_centers: 8,
      status: "active",
      created_at: "2023-01-20T09:15:00Z",
      updated_at: "2023-11-15T16:45:00Z"
    },
    {
      id: "b2000003-0000-4000-8000-000000000003",
      university_id: "a1000000-0000-4000-8000-000000000001",
      name: "Faculty of Business Administration",
      description: "Management, finance and entrepreneurship education.",
      dean: "Dr. Emily Rodriguez",
      email: "business@university.edu",
      phone: "+1 (555) 345-6789",
      website: "https://business.university.edu",
      location: "Business School Building",
      established_year: 1975,
      total_students: 1500,
      total_programs: 10,
      research_centers: 4,
      status: "active",
      created_at: "2023-02-10T11:00:00Z",
      updated_at: "2023-10-30T13:20:00Z"
    },
    {
      id: "b2000004-0000-4000-8000-000000000004",
      university_id: "a1000000-0000-4000-8000-000000000001",
      name: "Faculty of Medicine",
      description: "Medical sciences and healthcare programs.",
      dean: "Prof. Dr. James Wilson",
      email: "medicine@university.edu",
      phone: "+1 (555) 456-7890",
      website: "https://medicine.university.edu",
      location: "Medical Sciences Building",
      established_year: 1965,
      total_students: 800,
      total_programs: 6,
      research_centers: 12,
      status: "active",
      created_at: "2023-02-28T14:45:00Z",
      updated_at: "2023-12-05T10:15:00Z"
    },
    {
      id: "b2000005-0000-4000-8000-000000000005",
      university_id: "a1000000-0000-4000-8000-000000000001",
      name: "Faculty of Arts and Humanities",
      description: "Literature, history, philosophy and languages.",
      dean: "Dr. Maria Garcia",
      email: "arts@university.edu",
      phone: "+1 (555) 567-8901",
      website: "https://arts.university.edu",
      location: "Humanities Building",
      established_year: 1950,
      total_students: 900,
      total_programs: 9,
      research_centers: 3,
      status: "inactive",
      created_at: "2023-03-15T08:30:00Z",
      updated_at: "2023-09-20T15:30:00Z"
    },
    {
      id: "b2000006-0000-4000-8000-000000000006",
      university_id: "a1000000-0000-4000-8000-000000000001",
      name: "Faculty of Science",
      description: "Physics, chemistry, biology and mathematics.",
      dean: "Prof. Dr. Robert Kim",
      email: "science@university.edu",
      phone: "+1 (555) 678-9012",
      website: "https://science.university.edu",
      location: "Science Center",
      established_year: 1960,
      total_students: 1100,
      total_programs: 11,
      research_centers: 7,
      status: "active",
      created_at: "2023-03-25T13:20:00Z",
      updated_at: "2023-11-10T09:45:00Z"
    },
    {
      id: "b2000007-0000-4000-8000-000000000007",
      university_id: "a1000000-0000-4000-8000-000000000001",
      name: "Faculty of Law",
      description: "Legal studies and jurisprudence programs.",
      dean: "Prof. Dr. Jennifer Lee",
      email: "law@university.edu",
      phone: "+1 (555) 789-0123",
      website: "https://law.university.edu",
      location: "Law School Building",
      established_year: 1970,
      total_students: 600,
      total_programs: 5,
      research_centers: 4,
      status: "pending",
      created_at: "2023-04-05T16:10:00Z",
      updated_at: "2023-12-12T11:30:00Z"
    },
    {
      id: "b2000008-0000-4000-8000-000000000008",
      university_id: "a1000000-0000-4000-8000-000000000001",
      name: "Faculty of Education",
      description: "Teacher training and educational research.",
      dean: "Dr. Thomas Brown",
      email: "education@university.edu",
      phone: "+1 (555) 890-1234",
      website: "https://education.university.edu",
      location: "Education Building",
      established_year: 1985,
      total_students: 700,
      total_programs: 7,
      research_centers: 2,
      status: "active",
      created_at: "2023-04-20T10:00:00Z",
      updated_at: "2023-11-28T14:15:00Z"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFaculties(mockFaculties);
      setFilteredFaculties(mockFaculties);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = faculties.filter(faculty => {
      const matchesSearch =
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.dean?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || faculty.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sorting
    result.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'students':
          aValue = a.total_students || 0;
          bValue = b.total_students || 0;
          break;
        case 'programs':
          aValue = a.total_programs || 0;
          bValue = b.total_programs || 0;
          break;
        case 'established':
          aValue = a.established_year || 0;
          bValue = b.established_year || 0;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredFaculties(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, statusFilter, sortBy, sortOrder, faculties]);

  // Pagination
  const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaculties = filteredFaculties.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    if (selectedFaculties.length === currentFaculties.length) {
      setSelectedFaculties([]);
    } else {
      setSelectedFaculties(currentFaculties.map(f => f.id));
    }
  };

  const handleSelectFaculty = (id: string) => {
    if (selectedFaculties.includes(id)) {
      setSelectedFaculties(selectedFaculties.filter(facultyId => facultyId !== id));
    } else {
      setSelectedFaculties([...selectedFaculties, id]);
    }
  };

  const handleAddFaculty = () => {
    // Add new faculty logic here
    setShowAddModal(false);
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
      setFaculties(faculties.filter(f => f.id !== deletingFaculty.id));
      setShowDeleteModal(false);
      setDeletingFaculty(null);
    }
  };

  const toggleStatus = (id: string) => {
    setFaculties(faculties.map(faculty => {
      if (faculty.id === id) {
        const newStatus = faculty.status === 'active' ? 'inactive' : 'active';
        return { ...faculty, status: newStatus };
      }
      return faculty;
    }));
  };

  const bulkDelete = () => {
    setFaculties(faculties.filter(f => !selectedFaculties.includes(f.id)));
    setSelectedFaculties([]);
  };

  const bulkToggleStatus = (status: 'active' | 'inactive') => {
    setFaculties(faculties.map(faculty => {
      if (selectedFaculties.includes(faculty.id)) {
        return { ...faculty, status };
      }
      return faculty;
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Faculties Management</h1>
              <p className="text-gray-600">Manage university faculties and programs</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowImportModal(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Upload size={18} />
                Import
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download size={18} />
                Export
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Faculty
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Faculties</p>
                <p className="text-3xl font-bold text-gray-900">{faculties.length}</p>
              </div>
              <Building className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {faculties.filter(f => f.status === 'active').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-purple-600">
                  {faculties.reduce((sum, f) => sum + (f.total_students || 0), 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Programs</p>
                <p className="text-3xl font-bold text-orange-600">
                  {faculties.reduce((sum, f) => sum + (f.total_programs || 0), 0)}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-8">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow mb-6">
          <div className="p-4 border-b">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search faculties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="students">Sort by Students</option>
                  <option value="programs">Sort by Programs</option>
                  <option value="established">Sort by Established</option>
                  <option value="status">Sort by Status</option>
                </select>

                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border rounded-lg hover:bg-gray-50"
                >
                  {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                </button>

                <button className="p-2 border rounded-lg hover:bg-gray-50">
                  <Filter size={20} />
                </button>

                <button
                  onClick={() => {
                    setFaculties(mockFaculties);
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className="p-2 border rounded-lg hover:bg-gray-50"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedFaculties.length > 0 && (
            <div className="p-4 bg-blue-50 border-b">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">
                    {selectedFaculties.length} faculty{selectedFaculties.length !== 1 ? 'ies' : ''} selected
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => bulkToggleStatus('active')}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => bulkToggleStatus('inactive')}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={bulkDelete}
                    className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => setSelectedFaculties([])}
                    className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table Controls */}
          <div className="p-4 border-b">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span className="text-gray-600">entries</span>
                </div>
                <span className="text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredFaculties.length)} of {filteredFaculties.length} entries
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Faculties Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Faculty Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dean
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Programs
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Established
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentFaculties.map((faculty) => (
                      <tr
                        key={faculty.id}
                        className={`hover:bg-gray-50 ${selectedFaculties.includes(faculty.id) ? 'bg-blue-50' : ''}`}
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
                          <div>
                            <div className="font-medium text-gray-900">{faculty.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{faculty.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{faculty.dean || '-'}</div>
                          {faculty.email && (
                            <div className="text-sm text-gray-500">{faculty.email}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{faculty.total_students?.toLocaleString() || '0'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{faculty.total_programs || '0'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(faculty.status)}
                            <button
                              onClick={() => toggleStatus(faculty.id)}
                              className={`p-1 rounded ${faculty.status === 'active'
                                  ? 'text-green-600 hover:bg-green-50'
                                  : 'text-red-600 hover:bg-red-50'
                                }`}
                            >
                              {faculty.status === 'active' ? (
                                <X size={16} />
                              ) : (
                                <Check size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {faculty.established_year || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(faculty.updated_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditFaculty(faculty)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteFaculty(faculty)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded">
                              <MoreVertical size={18} />
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
                  <p className="text-gray-500 mb-6">
                    {searchQuery || statusFilter !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'Get started by adding your first faculty'}
                  </p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={18} className="inline mr-2" />
                    Add Faculty
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {filteredFaculties.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredFaculties.length)} of {filteredFaculties.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`p-2 rounded ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronsLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronsRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Faculty</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Faculty Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Faculty of Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dean is Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Prof. Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="faculty@university.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://faculty.university.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Established Year
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1995"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Students
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Programs
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="8"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the faculty..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Building, Room Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Faculty</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Faculty Name *
                    </label>
                    <input
                      type="text"
                      defaultValue={editingFaculty.name}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dean iss Name
                    </label>
                    <input
                      type="text"
                      defaultValue={editingFaculty.dean}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={editingFaculty.email}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={editingFaculty.phone}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      defaultValue={editingFaculty.website}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Established Year
                    </label>
                    <input
                      type="number"
                      defaultValue={editingFaculty.established_year}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Students
                    </label>
                    <input
                      type="number"
                      defaultValue={editingFaculty.total_students}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Programs
                    </label>
                    <input
                      type="number"
                      defaultValue={editingFaculty.total_programs}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={editingFaculty.description}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={editingFaculty.location}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      defaultValue={editingFaculty.status}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Faculty</h2>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold">{deletingFaculty.name}</span>? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteFaculty}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Faculty
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Import Faculties</h2>
              <p className="text-gray-600 text-center mb-6">
                Upload a CSV file with faculty data. Download the template file for the correct format.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your CSV file here</p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                  Browse Files
                  <input type="file" className="hidden" accept=".csv" />
                </label>
                <p className="text-gray-500 text-sm mt-4">Maximum file size: 5MB</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Download Template
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
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
