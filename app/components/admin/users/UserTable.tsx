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
  Edit,
  Eye,
  Phone,
  MoreVertical,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  ShieldCheck,
  ShieldAlert,
  Ban,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DeleteConfirmationModal from "../universities/DeleteConfirmationModal";
import UserForm from "./UserForm";
import { toast } from "sonner";
import {
  useAllProfiles,
  useDeleteProfile,
  useUpdateUserStatus,
} from "@/hooks/use-queries-hook";
import { UserProfileResponse } from "@/types/nextstepedu";

const UserTable = () => {
  const { data: profiles = [], isLoading, error } = useAllProfiles();
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteProfile();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateUserStatus();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "suspended"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfileResponse | null>(
    null,
  );

  const itemsPerPage = 5;

  const filteredUsers = useMemo(() => {
    const profilesList = Array.isArray(profiles)
      ? profiles
      : (profiles as any)?.profiles || (profiles as any)?.data || [];

    return profilesList.filter((user: UserProfileResponse) => {
      const fullName = `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim();

      const matchesSearch =
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.email &&
          user.email.toLowerCase().includes(searchQuery.toLowerCase()));

      const userRoleLower = (user as any)?.role
        ? String((user as any).role).toLowerCase()
        : "";

      const matchesRole =
        roleFilter === "all" ||
        (roleFilter === "admin" && userRoleLower === "admin") ||
        (roleFilter === "user" && userRoleLower === "user");

      const statusLower = user.status
        ? String(user.status).toLowerCase()
        : "active";
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && statusLower === "active") ||
        (statusFilter === "inactive" && statusLower === "inactive") ||
        (statusFilter === "suspended" && statusLower === "suspended");

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter, profiles]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    deleteProfile(userToDelete.id, {
      onSuccess: () => {
        toast.success("User deleted successfully");
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      },
      onError: (err: any) => {
        toast.error(err.response?.data || "Failed to delete user");
      },
    });
  };

  const handleStatusUpdate = (userId: number, newStatus: string) => {
    updateStatus(
      { id: userId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`User status updated to ${newStatus}`);
        },
        onError: (err: any) => {
          console.group("Status Update Error Debug");
          console.error("User ID:", userId);
          console.error("Requested Status:", newStatus);
          console.error("Error Object:", err);
          if (err.response) {
            console.error("Response Status:", err.response.status);
            console.error("Response Data:", err.response.data);
          } else if (err.request) {
            console.error(
              "No response received. Request details:",
              err.request,
            );
          } else {
            console.error("Error message:", err.message);
          }
          console.groupEnd();

          toast.error(
            err.response?.data?.message ||
              err.response?.data ||
              "Failed to update status",
          );
        },
      },
    );
  };

  const renderRoleBadge = (user: UserProfileResponse) => {
    const role = (user as any)?.role
      ? String((user as any).role).toUpperCase()
      : "USER";

    const isAdmin = role === "ADMIN";
    return (
      <Badge
        className={cn(
          "font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 border-none rounded-lg",
          isAdmin ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700",
        )}
      >
        {isAdmin ? "Admin" : "Student"}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User Account"
        description={`Are you sure you want to delete the account for "${userToDelete?.name}"? This will permanently remove their profile and access to the platform.`}
        isLoading={isDeleting}
      />

      {editingUser && (
        <UserForm user={editingUser} onClose={() => setEditingUser(null)} />
      )}

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-1 items-center gap-3 w-full max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-outfit"
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 gap-2 text-gray-600 rounded-xl border-gray-200"
                >
                  <ShieldCheck className="h-4 w-4" />
                  {roleFilter === "all"
                    ? "All Roles"
                    : roleFilter === "user"
                      ? "Student"
                      : "Admin"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl">
                <DropdownMenuItem
                  onClick={() => {
                    setRoleFilter("all");
                    setCurrentPage(1);
                  }}
                >
                  All Roles
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setRoleFilter("admin");
                    setCurrentPage(1);
                  }}
                >
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setRoleFilter("user");
                    setCurrentPage(1);
                  }}
                >
                  Student
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 gap-2 text-gray-600 rounded-xl border-gray-200"
                >
                  <Filter className="h-4 w-4" />
                  {statusFilter === "all"
                    ? "All Status"
                    : statusFilter === "active"
                      ? "Active"
                      : statusFilter === "inactive"
                        ? "Inactive"
                        : "Suspended"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl">
                <DropdownMenuItem
                  onClick={() => {
                    setStatusFilter("all");
                    setCurrentPage(1);
                  }}
                >
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setStatusFilter("active");
                    setCurrentPage(1);
                  }}
                  className="text-green-600"
                >
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setStatusFilter("inactive");
                    setCurrentPage(1);
                  }}
                  className="text-amber-600"
                >
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setStatusFilter("suspended");
                    setCurrentPage(1);
                  }}
                  className="text-red-600"
                >
                  Suspended
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* User List Table */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">User Profile</TableHead>
              <TableHead>Account Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-gray-500 font-medium font-outfit"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading users...
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-red-500 font-medium font-outfit"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p>Failed to load users.</p>
                    <p className="text-xs text-gray-400">
                      {(error as any)?.message}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                      className="mt-2"
                    >
                      Retry
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((user: UserProfileResponse) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-blue-50/10 transition-colors border-gray-50"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm shrink-0">
                        {(user as any).imageUrl || (user as any).image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={(user as any).imageUrl || (user as any).image}
                            alt={user.firstname}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserCircle className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-gray-900 truncate font-outfit">
                          {user.firstname} {user.lastname}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={cn(
                        "font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 border-none rounded-lg",
                        (user.status || "ACTIVE").toUpperCase() === "ACTIVE" &&
                          "bg-green-100 text-green-700",
                        (user.status || "").toUpperCase() === "INACTIVE" &&
                          "bg-amber-100 text-amber-700",
                        (user.status || "").toUpperCase() === "SUSPENDED" &&
                          "bg-red-100 text-red-700",
                        !user.status && "bg-green-100 text-green-700",
                      )}
                    >
                      {user.status || "ACTIVE"}
                    </Badge>
                  </TableCell>

                  {/* ✅ ROLE COLUMN */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {renderRoleBadge(user)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {user.phone || "N/A"}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-gray-500 font-medium font-outfit">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 hover:bg-gray-100 rounded-xl"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-2xl shadow-xl border-gray-100 p-2"
                      >

                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer py-2.5 rounded-lg"
                          onClick={() => setEditingUser(user)}
                        >
                          <Edit className="h-4 w-4 text-amber-500" />
                          <span className="font-bold text-gray-700 text-xs">
                            Edit Account
                          </span>
                        </DropdownMenuItem>

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer py-2.5 rounded-lg">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span className="font-bold text-gray-700 text-xs">
                              Update Status
                            </span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="w-40 rounded-xl p-1 shadow-lg border-gray-100">
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusUpdate(user.userId, "ACTIVE")
                              }
                              className="flex items-center gap-2 cursor-pointer py-2 rounded-lg"
                              disabled={
                                isUpdatingStatus ||
                                (user.status || "ACTIVE").toUpperCase() ===
                                  "ACTIVE"
                              }
                            >
                              <ShieldCheck className="h-4 w-4 text-green-500" />
                              <span className="font-bold text-gray-700 text-[10px] uppercase">
                                Active
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusUpdate(user.userId, "INACTIVE")
                              }
                              className="flex items-center gap-2 cursor-pointer py-2 rounded-lg"
                              disabled={
                                isUpdatingStatus ||
                                (user.status || "").toUpperCase() === "INACTIVE"
                              }
                            >
                              <Ban className="h-4 w-4 text-amber-500" />
                              <span className="font-bold text-gray-700 text-[10px] uppercase">
                                Inactive
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusUpdate(user.userId, "SUSPENDED")
                              }
                              className="flex items-center gap-2 cursor-pointer py-2 rounded-lg"
                              disabled={
                                isUpdatingStatus ||
                                (user.status || "").toUpperCase() ===
                                  "SUSPENDED"
                              }
                            >
                              <ShieldAlert className="h-4 w-4 text-red-500" />
                              <span className="font-bold text-gray-700 text-[10px] uppercase">
                                Suspended
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator className="my-1 border-gray-50" />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-64 text-center bg-gray-50/20"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Search className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="text-base font-bold text-gray-500">
                      No users found matching your search
                    </p>
                    <Button
                      variant="link"
                      className="text-blue-600 font-bold"
                      onClick={() => {
                        setSearchQuery("");
                        setRoleFilter("all");
                        setStatusFilter("all");
                        setCurrentPage(1);
                      }}
                    >
                      Reset all filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer / Pagination */}
        <div className="px-8 py-5 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Total Users:{" "}
            <span className="text-gray-900">{filteredUsers.length}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl border-gray-200"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-9 w-9 rounded-xl text-xs font-bold transition-all",
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105"
                      : "text-gray-500 hover:bg-white",
                  )}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl border-gray-200"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
