"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Eye,
  Globe,
  MapPin,
  MoreVertical,
  ExternalLink,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {
  useAllUniversities,
  useDeleteUniversity,
} from "@/hooks/use-queries-hook";

const UniversityTable = () => {
  const { data: universities = [], isLoading } = useAllUniversities();
  const { mutate: deleteUniversity, isPending: isDeletingUniversity } =
    useDeleteUniversity();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const itemsPerPage = 5;

  // Filter logic
  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (uni.city &&
          uni.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (uni.country &&
          uni.country.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus =
        statusFilter === "all" ||
        (uni.status && uni.status.toLowerCase() === statusFilter.toLowerCase());
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, universities]);

  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const paginatedData = filteredUniversities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDeleteClick = (id: number, name: string) => {
    setUniversityToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!universityToDelete) return;
    deleteUniversity(universityToDelete.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setUniversityToDelete(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-3 text-gray-500 font-medium font-outfit">
          Loading universities...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete University"
        description={`Are you sure you want to delete "${universityToDelete?.name}"? This will permanently remove the record and all associated data from the system.`}
        isLoading={isDeletingUniversity}
      />

      {/* Filters & Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex flex-1 items-center gap-3 w-full md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-outfit"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 text-gray-600 rounded-lg"
              >
                <Filter className="h-4 w-4" />
                {statusFilter === "all"
                  ? "All Status"
                  : statusFilter.charAt(0).toUpperCase() +
                    statusFilter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 rounded-xl shadow-xl"
            >
              <DropdownMenuItem
                onClick={() => setStatusFilter("all")}
                className="cursor-pointer font-medium"
              >
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter("active")}
                className="cursor-pointer font-medium text-green-600"
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter("inactive")}
                className="cursor-pointer font-medium text-gray-600"
              >
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[350px]">
                <div className="flex items-center gap-2 cursor-pointer group py-2">
                  University
                  <ArrowUpDown className="h-3 w-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </TableHead>
              <TableHead>Location</TableHead>
              {/* Tuition Rank removed as it's not in backend response */}
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer group">
                  Created At
                  <ArrowUpDown className="h-3 w-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((uni) => (
                <TableRow
                  key={uni.id}
                  className="hover:bg-blue-50/20 transition-colors border-gray-100"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm shrink-0 relative">
                        {uni.logo ? (
                          <Image
                            src={uni.logo}
                            alt={uni.name}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        ) : (
                          <Globe className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-gray-900 truncate font-outfit">
                          {uni.name}
                        </span>
                        {uni.officialWebsite && (
                          <a
                            href={uni.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 flex items-center gap-1 hover:underline group w-fit"
                          >
                            {uni.slug || "website"}{" "}
                            <ExternalLink className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="p-1.5 bg-green-50 rounded-lg shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="truncate">
                        {uni.city || "N/A"}, {uni.country || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        (uni.status || "active").toLowerCase() === "active"
                          ? "default"
                          : "secondary"
                      }
                      className={cn(
                        "font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 border-none",
                        (uni.status || "active").toLowerCase() === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {uni.status || "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 font-medium">
                    {uni.createdAt
                      ? new Date(uni.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-44 rounded-xl shadow-xl border-gray-100"
                      >
                        <Link href={`/admin/universities/${uni.id}`}>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5 font-medium">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-700">View Details</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/universities/${uni.id}/edit`}>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5 font-medium">
                            <Edit className="h-4 w-4 text-amber-500" />
                            <span className="text-gray-700">
                              Edit University
                            </span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 py-2.5 font-bold"
                          onClick={() => handleDeleteClick(uni.id, uni.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete Record</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-48 text-center bg-gray-50/30"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                      No universities found matching your criteria.
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Section */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between font-outfit">
          <p className="text-xs text-gray-500 font-medium tracking-tight">
            Showing{" "}
            <span className="text-gray-900 font-bold">
              {filteredUniversities.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}
            </span>{" "}
            to{" "}
            <span className="text-gray-900 font-bold">
              {Math.min(
                currentPage * itemsPerPage,
                filteredUniversities.length,
              )}
            </span>{" "}
            of{" "}
            <span className="text-gray-900 font-bold">
              {filteredUniversities.length}
            </span>{" "}
            entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-lg hover:bg-white border-gray-200"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 text-gray-400" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg text-xs font-bold transition-all",
                    currentPage === i + 1
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 scale-110"
                      : "text-gray-400 hover:bg-white hover:text-gray-900",
                  )}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-lg hover:bg-white border-gray-200"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityTable;
