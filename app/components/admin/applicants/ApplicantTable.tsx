"use client";

import React, { useState, useMemo } from "react";
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
  Eye,
  MoreVertical,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Loader2,
  Mail,
  Phone,
  GraduationCap,
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
import {
  useAllApplicants,
  useDeleteApplicant,
  useUpdateApplicantStatus,
} from "@/hooks/use-queries-hook";
import DeleteConfirmationModal from "../universities/DeleteConfirmationModal";
import { toast } from "sonner";

const ApplicantTable = () => {
  const { data: applicants = [], isLoading } = useAllApplicants();
  const { mutate: deleteApplicant, isPending: isDeleting } =
    useDeleteApplicant();
  const { mutate: updateStatus } = useUpdateApplicantStatus();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const itemsPerPage = 5;

  // Filter logic
  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.intendedMajor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (app.status && app.status.toLowerCase() === statusFilter.toLowerCase());
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, applicants]);

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const paginatedData = filteredApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleConfirmDelete = () => {
    if (!applicantToDelete) return;
    deleteApplicant(applicantToDelete.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setApplicantToDelete(null);
      },
    });
  };

  const handleStatusUpdate = (id: number, status: string) => {
    updateStatus(
      { id, status },
      {
        onSuccess: () =>
          toast.success(`Applicant ${status.toLowerCase()} successfully`),
        onError: (err: any) =>
          toast.error(
            err.response?.data?.message ||
              `Failed to ${status.toLowerCase()} applicant`,
          ),
      },
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-3 text-gray-500 font-medium font-outfit">
          Loading applicants...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Applicant"
        description={`Are you sure you want to delete the application of "${applicantToDelete?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />

      {/* Filters & Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex flex-1 items-center gap-3 w-full md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or major..."
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
                onClick={() => setStatusFilter("pending")}
                className="cursor-pointer font-medium text-amber-600"
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter("approved")}
                className="cursor-pointer font-medium text-green-600"
              >
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter("rejected")}
                className="cursor-pointer font-medium text-red-600"
              >
                Rejected
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
              <TableHead className="w-[300px]">
                <div className="flex items-center gap-2 cursor-pointer group py-2">
                  Applicant
                  <ArrowUpDown className="h-3 w-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Major / GPA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((app) => (
                <TableRow
                  key={app.id}
                  className="hover:bg-blue-50/20 transition-colors border-gray-100"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0 capitalize text-blue-600 font-bold">
                        {app.firstName[0]}
                        {app.lastName[0]}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-gray-900 truncate font-outfit">
                          {app.firstName} {app.lastName}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          {app.gender === "MALE"
                            ? "Male"
                            : app.gender === "FEMALE"
                              ? "Female"
                              : app.gender}
                          ,{" "}
                          {new Date().getFullYear() -
                            new Date(app.dateOfBirth).getFullYear()}{" "}
                          years
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="w-3 h-3 text-blue-400" />
                        <span className="truncate">{app.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone className="w-3 h-3 text-green-400" />
                        <span>{app.phoneNumber}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="truncate">{app.intendedMajor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>GPA: {app.gpa.toFixed(2)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 border-none",
                        getStatusColor(app.status),
                      )}
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500 font-medium">
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString(undefined, {
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
                        className="w-48 rounded-xl shadow-xl border-gray-100"
                      >
                        <Link href={`/admin/applicants/${app.id}`}>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5 font-medium">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-700">
                              View Application
                            </span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <div className="px-2 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Update Status
                        </div>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(app.id, "APPROVED")}
                          className="flex items-center gap-2 cursor-pointer py-2 text-green-600 font-semibold"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500" />{" "}
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                          className="flex items-center gap-2 cursor-pointer py-2 text-red-600 font-semibold"
                        >
                          <div className="w-2 h-2 rounded-full bg-red-500" />{" "}
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
                      No applicants found matching your criteria.
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
              {filteredApplicants.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}
            </span>{" "}
            to{" "}
            <span className="text-gray-900 font-bold">
              {Math.min(currentPage * itemsPerPage, filteredApplicants.length)}
            </span>{" "}
            of{" "}
            <span className="text-gray-900 font-bold">
              {filteredApplicants.length}
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

export default ApplicantTable;

const Star = ({ className, fill }: { className?: string; fill?: string }) => (
  <svg
    className={className}
    fill={fill || "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    ></path>
  </svg>
);
