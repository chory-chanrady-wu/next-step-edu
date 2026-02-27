"use client";

import * as React from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Loader2,
  Building2,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import {
  useAllScholarships,
  useDeleteScholarship,
} from "@/hooks/use-queries-hook";
import { ScholarshipResponse } from "@/types/nextstepedu";

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
import { Card, CardContent } from "@/components/ui/card";
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

// Status configuration
const STATUS_CONFIG = {
  ACTIVE: {
    label: "Active",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-emerald-600",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  INACTIVE: {
    label: "Inactive",
    icon: XCircle,
    gradient: "from-gray-500 to-gray-600",
    lightBg: "bg-gray-50",
    textColor: "text-gray-700",
  },
} as const;

// Helper: map OPEN to ACTIVE
const getStatusConfig = (status?: string) => {
  if (!status) return STATUS_CONFIG.ACTIVE;
  const upperStatus = status.toUpperCase();
  if (upperStatus === "OPEN") return STATUS_CONFIG.ACTIVE;
  return STATUS_CONFIG[upperStatus as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.ACTIVE;
};

type Scholarship = ScholarshipResponse & {
  amount?: number;
  currency?: string;
  featured?: boolean;
};

export const TableListScholarship = () => {
  const { isLoading, data } = useAllScholarships();
  const { mutate: deleteScholarship, isPending: onDeletingScholarship } =
    useDeleteScholarship();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [scholarshipToDelete, setScholarshipToDelete] = React.useState<Scholarship | null>(null);

  const itemsPerPage = 10;

  // Filter scholarships
  const filteredData = React.useMemo(() => {
    if (!data?.content) return [];
    let filtered = data.content as Scholarship[];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q) ||
          s.university?.name?.toLowerCase().includes(q) ||
          s.program?.name?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((s) => {
        const status = s.status?.toUpperCase() || "";
        if (statusFilter === "ACTIVE") {
          return status === "ACTIVE" || status === "OPEN";
        }
        return status === statusFilter;
      });
    }

    return filtered;
  }, [data, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Format currency
  const formatAmount = (amount?: number, currency = "USD") => {
    if (!amount) return "N/A";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `$${amount.toLocaleString()}`;
    }
  };

  // Format deadline
  const formatDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const date = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      formatted: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      daysLeft,
      isUrgent: daysLeft <= 7 && daysLeft > 0,
      isExpired: daysLeft <= 0,
    };
  };

  // Avatar gradient
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

  const handleDeleteClick = (scholarship: Scholarship) => {
    setScholarshipToDelete(scholarship);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!scholarshipToDelete) return;
    deleteScholarship(scholarshipToDelete.id, {
      onSettled: () => {
        setScholarshipToDelete(null);
        setShowDeleteModal(false);
      },
      onSuccess: () => {
        toast.success("Scholarship deleted", {
          description: "The list has been updated.",
        });
      },
      onError: (error: any) => {
        toast.error("Delete failed", {
          description: error?.response?.data?.message || error.message,
        });
      },
    });
  };

  if (isLoading) return <ScholarshipSkeleton />;

  return (
    <>
      {/* Global deleting overlay */}
      {onDeletingScholarship && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-gray-700">Deleting scholarship...</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Scholarships
              </h1>
              <Badge variant="secondary" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                {filteredData.length} Total
              </Badge>
            </div>
            <p className="text-sm text-gray-500 ml-3">
              Manage and track all scholarship opportunities across universities
            </p>
          </div>
          <Link href="/admin/scholarships/create">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25">
              <Plus className="mr-2 h-4 w-4" />
              Create Scholarship
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, university, program..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              {/* Desktop filters */}
              <div className="hidden lg:flex items-center gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] border-gray-200">
                    <Filter className="h-4 w-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="ACTIVE">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                        <span>Active</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="INACTIVE">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-gray-700" />
                        <span>Inactive</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {(searchQuery || statusFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setCurrentPage(1);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear filters
                  </Button>
                )}
              </div>

              {/* Mobile filter toggle */}
              <Button
                variant="outline"
                className="lg:hidden border-gray-200"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(searchQuery || statusFilter !== "all") && (
                  <Badge variant="secondary" className="ml-2 bg-blue-100">
                    Active
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile filters panel */}
            {showMobileFilters && (
              <div className="mt-4 lg:hidden space-y-3 pt-4 border-t border-gray-100">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full border-gray-200">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="ACTIVE">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                        <span>Active</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="INACTIVE">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-gray-700" />
                        <span>Inactive</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {(searchQuery || statusFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setCurrentPage(1);
                    }}
                    className="w-full text-gray-500"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border min-h-[75vh] p-2 flex flex-col">
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700">Scholarship</TableHead>
                  <TableHead className="font-semibold text-gray-700">University</TableHead>
                  <TableHead className="font-semibold text-gray-700">Program</TableHead>
                  <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Deadline</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((scholarship) => {
                    const deadline = formatDeadline(scholarship.deadline);
                    const statusConfig = getStatusConfig(scholarship.status);
                    const avatarGradient = getAvatarGradient(scholarship.id);
                    const amount = scholarship.amount || 0;
                    const currency =  "USD";

                    return (
                      <TableRow
                        key={scholarship.id}
                        className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200"
                      >
                        {/* Scholarship column */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 rounded-xl border-2 border-white shadow-md">
                              <AvatarImage src={scholarship.logoUrl || ""} />
                              <AvatarFallback
                                className={`rounded-xl bg-gradient-to-br ${avatarGradient} text-white font-semibold`}
                              >
                                {scholarship.name?.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                  {scholarship.name}
                                </span>
                                {(scholarship as any).featured && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] px-1.5"
                                  >
                                    Featured
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* University column */}
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {scholarship.university?.name || "—"}
                            </span>
                          </div>
                        </TableCell>

                        {/* Program column */}
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              {scholarship.program?.name || "—"}
                            </span>
                          </div>
                        </TableCell>

                        {/* Amount column */}
                        <TableCell>
                          <span className="font-semibold text-emerald-600 text-lg">
                            {formatAmount(amount, currency)}
                          </span>
                        </TableCell>

                        {/* Status column */}
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusConfig.lightBg} ${statusConfig.textColor}`}
                          >
                            {statusConfig.label}
                          </span>
                        </TableCell>

                        {/* Deadline column */}
                        <TableCell>
                          {deadline ? (
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                {deadline.formatted}
                              </div>
                              <div
                                className={`text-xs px-2 py-0.5 rounded-full inline-block ${deadline.isExpired
                                    ? "bg-gray-100 text-gray-600"
                                    : deadline.isUrgent
                                      ? "bg-rose-100 text-rose-700"
                                      : "bg-blue-50 text-blue-700"
                                  }`}
                              >
                                {deadline.isExpired
                                  ? "Expired"
                                  : `${deadline.daysLeft} days left`}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </TableCell>

                        {/* Actions column */}
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/scholarships/edit/${scholarship.id}`}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(scholarship)}
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
                    <TableCell colSpan={7} className="h-96">
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-20 animate-pulse" />
                          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-full">
                            <Search className="h-12 w-12 text-blue-500" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
                          No scholarships found
                        </h3>
                        <p className="text-sm text-gray-500 mb-6 max-w-md text-center">
                          {searchQuery || statusFilter !== "all"
                            ? "We couldn't find any scholarships matching your criteria. Try adjusting your filters."
                            : "Get started by creating your first scholarship opportunity."}
                        </p>
                        {!searchQuery && statusFilter === "all" && (
                          <Link href="/admin/scholarships/create">
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25">
                              <Plus className="mr-2 h-4 w-4" />
                              Create Your First Scholarship
                            </Button>
                          </Link>
                        )}
                        {(searchQuery || statusFilter !== "all") && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSearchQuery("");
                              setStatusFilter("all");
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
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900">
                  {Math.min(currentPage * itemsPerPage, filteredData.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900">
                  {filteredData.length}
                </span>{" "}
                results
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

        {/* Delete confirmation modal */}
        {showDeleteModal && scholarshipToDelete && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mx-auto mb-4">
                  <Trash2 className="w-6 h-6 text-rose-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900 text-center mb-2">
                  Delete Scholarship
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-gray-900">
                    {scholarshipToDelete.name}
                  </span>
                  ? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setScholarshipToDelete(null);
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
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

// Skeleton loader with new column structure
const ScholarshipSkeleton = () => (
  <div className="space-y-8">
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

    <Skeleton className="h-20 rounded-xl bg-gray-200" />

    <div className="rounded-xl border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-100">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-4 w-28 bg-gray-200" />
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
                </div>
              </div>
              <Skeleton className="h-6 w-32 bg-gray-200" />
              <Skeleton className="h-6 w-32 bg-gray-200" />
              <Skeleton className="h-6 w-20 bg-gray-200" />
              <Skeleton className="h-6 w-16 bg-gray-200" />
              <Skeleton className="h-6 w-28 bg-gray-200" />
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
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TableListScholarship;
