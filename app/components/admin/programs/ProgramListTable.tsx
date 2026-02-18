"use client";

import * as React from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Loader2,
  BookOpen,
  GraduationCap,
  Building2,
  Users,
  DollarSign,
  Calendar,
  Sparkles,
  Euro,
  PoundSterling,
  JapaneseYen,
} from "lucide-react";
import Link from "next/link";
import { useAllPrograms, useDeleteProgram } from "@/hooks/use-queries-hook"; // adjust import as needed
import { ProgramResponse } from "@/types/nextstepedu";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// ============================================================================
// Configuration (similar to scholarships but tailored for programs)
// ============================================================================
const DEGREE_LEVELS = [
  { value: 1, label: "Bachelor" },
  { value: 2, label: "Master" },
  { value: 3, label: "PhD" },
  { value: 4, label: "Diploma" },
  { value: 5, label: "Certificate" },
] as const;

const currencyIconMap: Record<string, React.ElementType> = {
  USD: DollarSign,
  EUR: Euro,
  GBP: PoundSterling,
  JPY: JapaneseYen,
};

// Helper to get degree level label
const getDegreeLabel = (level?: number) => {
  if (!level) return "—";
  const found = DEGREE_LEVELS.find(d => d.value === level);
  return found?.label || `Level ${level}`;
};

// Amount formatting
const formatAmount = (amount?: number, currency: string = "USD") => {
  if (!amount) return <span>—</span>;

  const Icon = currencyIconMap[currency] || DollarSign;

  return (
    <div className="flex items-center gap-1">
      <Icon className="h-4 w-4 text-emerald-500" />
      <span>{amount.toLocaleString()}</span>
    </div>
  );
};


// Avatar gradient (same as scholarship)
const getAvatarGradient = (id: number) => {
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-purple-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-red-600",
  ];
  return gradients[id % gradients.length];
};

// ============================================================================
// Main Component
// ============================================================================
export const TableListProgram = () => {
  const { isLoading, data } = useAllPrograms();
  const { mutate: deleteProgram, isPending: onDeletingProgram } = useDeleteProgram();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [programIdToDelete, setProgramIdToDelete] = React.useState<number | string>(0);
  const [degreeFilter, setDegreeFilter] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  const itemsPerPage = 10;

  // Filter programs
  const filteredData = React.useMemo(() => {
    if (!data) return [];

    let filtered = data as ProgramResponse[];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description
      );
    }

    if (degreeFilter !== "all") {
      const level = parseInt(degreeFilter);
      filtered = filtered.filter((p) => p.degreeLevel === level);
    }

    return filtered;
  }, [data, searchQuery, degreeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteProgram = (id: string | number) => {
    setProgramIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteProgram = (id: string | number) => {
    setShowDeleteModal(false);
    if (id === 0) {
      toast.error("Failed to delete", {
        description: "Please try again later.",
      });
      return;
    }

    deleteProgram(id, {
      onSettled: () => {
        setProgramIdToDelete(0);
      },
      onSuccess: () => {
        toast.success("Program deleted!", {
          description: "The list has been updated.",
        });
      },
      onError: (error) => {
        toast.error("Failed to delete", {
          description: "Please try again later.",
        });
      }
    });
  };

  if (isLoading) {
    return <ProgramSkeleton />;
  }

  return (
    <>
      {/* Global deleting overlay */}
      {onDeletingProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-gray-700">Deleting program...</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Programs
              </h1>
              <Badge variant="secondary" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                {filteredData.length} Total
              </Badge>
            </div>
            <p className="text-sm text-gray-500 ml-3">
              Manage academic programs offered across universities and faculties
            </p>
          </div>
          <Link href="/admin/programs/create">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30">
              <Plus className="mr-2 h-4 w-4" />
              Create Program
            </Button>
          </Link>
        </div>

        {/* Filters Section */}
        <Card className="border-0 shadow-none">
          <CardContent className="">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, description, university, or faculty..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                  <SelectTrigger className="w-[200px] border-gray-200">
                    <Filter className="h-4 w-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="Degree Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {DEGREE_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value.toString()}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {searchQuery || degreeFilter !== "all" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setDegreeFilter("all");
                      setCurrentPage(1);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear filters
                  </Button>
                ) : null}
              </div>

              {/* Mobile Filters Button */}
              <Button
                variant="outline"
                className="lg:hidden border-gray-200"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(searchQuery || degreeFilter !== "all") && (
                  <Badge variant="secondary" className="ml-2 bg-blue-100">Active</Badge>
                )}
              </Button>
            </div>

            {/* Mobile Filters Panel */}
            {showMobileFilters && (
              <div className="mt-4 lg:hidden space-y-3 pt-4 border-t border-gray-100">
                <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                  <SelectTrigger className="w-full border-gray-200">
                    <SelectValue placeholder="Degree Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {DEGREE_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value.toString()}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {searchQuery || degreeFilter !== "all" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setDegreeFilter("all");
                      setCurrentPage(1);
                    }}
                    className="w-full text-gray-500"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                  </Button>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="border p-2 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700">Program</TableHead>
                  <TableHead className="font-semibold text-gray-700">Degree</TableHead>
                  <TableHead className="font-semibold text-gray-700">University</TableHead>
                  <TableHead className="font-semibold text-gray-700">Faculty</TableHead>
                  <TableHead className="font-semibold text-gray-700">Tuition Fee</TableHead>
                  <TableHead className="font-semibold text-gray-700">Duration</TableHead>
                  <TableHead className="font-semibold text-gray-700">Scholarships</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((program, index) => {
                    const avatarGradient = getAvatarGradient(program.id);
                    const degreeLabel = getDegreeLabel(program.degreeLevel);

                    return (
                      <TableRow
                        key={program.id}
                        className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 rounded-xl border-2 border-white shadow-md">
                              {/* No logo in schema, use first letter */}
                              <AvatarFallback className={`rounded-xl bg-gradient-to-br ${avatarGradient} text-white font-semibold`}>
                                {program.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-gray-900">{program.name}</div>
                              <div className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">
                                {program.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {degreeLabel}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{program.university.name}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{program.faculty.name}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {formatAmount(program.tuitionFeeAmount, program.currency)}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{program.studyPeriodMonths} months</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            <Users className="h-3 w-3 mr-1" />
                            {program.scholarshipCount}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/programs/edit/${program.id}`}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeleteProgram(program.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-96">
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-20 animate-pulse" />
                          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-full">
                            <Search className="h-12 w-12 text-blue-500" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
                          No programs found
                        </h3>
                        <p className="text-sm text-gray-500 mb-6 max-w-md text-center">
                          {searchQuery || degreeFilter !== "all"
                            ? "We couldn't find any programs matching your criteria. Try adjusting your filters."
                            : "Get started by creating your first academic program."}
                        </p>
                        {!searchQuery && degreeFilter === "all" && (
                          <Link href="/admin/programs/create">
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25">
                              <Plus className="mr-2 h-4 w-4" />
                              Create Your First Program
                            </Button>
                          </Link>
                        )}
                        {(searchQuery || degreeFilter !== "all") && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSearchQuery("");
                              setDegreeFilter("all");
                              setCurrentPage(1);
                            }}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Clear all filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{" "}
                <span className="font-medium text-gray-900">{filteredData.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        pageNum = currentPage - 3 + i;
                      }
                    }
                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-8 w-8 ${currentPage === pageNum
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                          : "border-gray-200 hover:bg-gray-100"
                          }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-rose-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900 text-center mb-2">
                  Delete Program
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-gray-900">this program</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmDeleteProgram(programIdToDelete)}
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
    </>
  );
};

// ============================================================================
// Loading Skeleton (matches the table layout)
// ============================================================================
const ProgramSkeleton = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-1 rounded-full bg-gray-200" />
          <Skeleton className="h-8 w-48 bg-gray-200" />
          <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
        </div>
        <Skeleton className="h-4 w-64 ml-3 bg-gray-200" />
      </div>
      <Skeleton className="h-10 w-36 rounded-lg bg-gray-200" />
    </div>

    {/* Filters Skeleton */}
    <Skeleton className="h-20 rounded-xl bg-gray-200" />

    {/* Table Skeleton */}
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-100">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-48 bg-gray-200" />
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-4 w-28 bg-gray-200" />
          <Skeleton className="h-4 w-28 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-4 w-20 ml-auto bg-gray-200" />
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-100">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-12 w-12 rounded-xl bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-48 bg-gray-200" />
                  <Skeleton className="h-3 w-32 bg-gray-200" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 bg-gray-200" />
              <Skeleton className="h-6 w-24 bg-gray-200" />
              <Skeleton className="h-6 w-24 bg-gray-200" />
              <Skeleton className="h-6 w-20 bg-gray-200" />
              <Skeleton className="h-6 w-16 bg-gray-200" />
              <Skeleton className="h-6 w-16 bg-gray-200" />
              <Skeleton className="h-8 w-8 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48 bg-gray-200" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded bg-gray-200" />
            <Skeleton className="h-8 w-8 rounded bg-gray-200" />
            <Skeleton className="h-8 w-8 rounded bg-gray-200" />
            <Skeleton className="h-8 w-8 rounded bg-gray-200" />
            <Skeleton className="h-8 w-8 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TableListProgram;
