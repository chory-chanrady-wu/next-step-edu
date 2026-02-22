"use client";

import * as React from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Building2,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useAllFaculties, useDeleteFaculty } from "@/hooks/use-queries-hook";
import { FacultyResponse } from "@/types/nextstepedu";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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

export const TableListFaculty = () => {
  const { isLoading, data } = useAllFaculties();
  const { mutate: deleteFaculty, isPending: onDeletingFaculty } =
    useDeleteFaculty();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [facultyToDelete, setFacultyToDelete] =
    React.useState<FacultyResponse | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemsPerPage = 10;

  // Filter faculties based on search (name, description, university name)
  const filteredData = React.useMemo(() => {
    if (!data) return [];
    let filtered = data;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(query) ||
          (f.description && f.description.toLowerCase().includes(query)) ||
          (f.data[0]?.name && f.data[0].name.toLowerCase().includes(query)),
      );
    }

    return filtered;
  }, [data, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDeleteClick = (faculty: FacultyResponse) => {
    // Check if faculty has associated programs
    if (faculty.programCount && faculty.programCount > 0) {
      toast.error("Cannot delete faculty", {
        description: `This faculty has ${faculty.programCount} program(s). Please delete them first.`,
      });
      return;
    }
    setFacultyToDelete(faculty);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!facultyToDelete) return;

    deleteFaculty(facultyToDelete.id, {
      onSettled: () => {
        setShowDeleteModal(false);
        setFacultyToDelete(null);
      },
      onSuccess: () => {
        toast.success("Faculty deleted successfully");
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message || error.message;
        // Check for foreign key violation
        if (
          message.includes("violates foreign key constraint") ||
          message.includes("still referenced")
        ) {
          toast.error("Cannot delete faculty", {
            description:
              "This faculty has associated programs. Please delete them first.",
          });
        } else {
          toast.error("Delete failed", {
            description: message,
          });
        }
      },
    });
  };

  if (isLoading) return <FacultySkeleton />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Faculties
            </h1>
            <Badge
              variant="secondary"
              className="ml-2 bg-blue-50 text-blue-700"
            >
              {filteredData.length} Total
            </Badge>
          </div>
          <p className="text-sm text-gray-500 ml-3">
            Manage academic faculties across universities
          </p>
        </div>
        <Link href="/admin/faculties/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
            <Plus className="mr-2 h-4 w-4" /> Create Faculty
          </Button>
        </Link>
      </div>

      {/* Global Deleting Overlay */}
      {onDeletingFaculty && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium text-gray-700">
              Syncing deletion...
            </p>
          </div>
        </div>
      )}

      {/* Search Filter */}
      <Card className="border-none shadow-sm bg-gray-50/50">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search faculties, descriptions or universities..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 bg-white"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
              >
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-none overflow-hidden">
        <div className="overflow-x-auto p-2">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Faculty</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Programs</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((faculty) => (
                  <TableRow
                    key={`${faculty.id}-${faculty.data[0]?.id}`}
                    className="hover:bg-indigo-50/30 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-lg shadow-sm">
                          <AvatarFallback
                            className={`rounded-lg bg-gradient-to-br ${getAvatarGradient(
                              faculty.id,
                            )} text-white text-xs font-bold`}
                          >
                            {faculty.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="max-w-[300px]">
                          <div className="font-semibold text-gray-900 truncate">
                            {faculty.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {faculty.description || "No description"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <Building2 className="h-3.5 w-3.5 text-gray-400" />
                        {faculty.data[0]?.name || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        <BookOpen className="h-3 w-3 mr-1" />{" "}
                        {faculty.programCount ?? 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/faculties/edit/${faculty.id}`}
                          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(faculty)}
                          className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-64 text-center text-gray-500"
                  >
                    No faculties found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50/30">
            <p className="text-xs text-gray-500">
              Showing page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Modal */}
      {showDeleteModal && facultyToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {facultyToDelete.name}
                </span>
                ? This action is irreversible.
              </p>
              <div className="flex gap-3 w-full mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setFacultyToDelete(null);
                  }}
                  disabled={onDeletingFaculty}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleConfirmDelete}
                  disabled={onDeletingFaculty}
                >
                  {onDeletingFaculty ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Skeleton loader (unchanged)
const FacultySkeleton = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

    {/* Search Skeleton */}
    <Skeleton className="h-20 rounded-xl bg-gray-200" />

    {/* Table Skeleton */}
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-100">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-48 bg-gray-200" />
          <Skeleton className="h-4 w-28 bg-gray-200" />
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-4 w-20 ml-auto bg-gray-200" />
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-100">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex items-center gap-4">
              {/* Faculty column with avatar */}
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-12 w-12 rounded-xl bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-48 bg-gray-200" />
                  <Skeleton className="h-3 w-32 bg-gray-200" />
                </div>
              </div>
              {/* University column */}
              <Skeleton className="h-6 w-24 bg-gray-200" />
              {/* Programs column */}
              <Skeleton className="h-6 w-16 bg-gray-200" />
              {/* Actions column */}
              <Skeleton className="h-8 w-8 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
        <Skeleton className="h-4 w-48 bg-gray-200" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded bg-gray-200" />
          <Skeleton className="h-8 w-8 rounded bg-gray-200" />
          <Skeleton className="h-8 w-8 rounded bg-gray-200" />
          <Skeleton className="h-8 w-8 rounded bg-gray-200" />
          <Skeleton className="h-8 w-8 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  </div>
);

export default TableListFaculty;
