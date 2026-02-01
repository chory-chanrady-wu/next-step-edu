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
    Trash2,
    Eye,
    Mail,
    Phone,
    MoreVertical,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Download,
    UserCircle,
    ShieldCheck,
    UserMinus,
    UserCheck,
    Lock
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
import DeleteConfirmationModal from "../universities/DeleteConfirmationModal";

// Mock data based on schema
const MOCK_USERS = [
    {
        id: "u1",
        email: "chory.chan@example.com",
        full_name: "Chory Chanrady",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chory",
        role: "admin",
        status: "active",
        phone: "+855 12 345 678",
        created_at: "2023-10-15T08:30:00Z",
    },
    {
        id: "u2",
        email: "sok.pheap@example.com",
        full_name: "Sok Pheap",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sok",
        role: "student",
        status: "active",
        phone: "+855 99 888 777",
        created_at: "2023-11-20T10:15:00Z",
    },
    {
        id: "u3",
        email: "davith.rek@example.com",
        full_name: "Davith Rek",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Davith",
        role: "recruiter",
        status: "active",
        phone: "+855 10 555 444",
        created_at: "2023-12-05T14:50:00Z",
    },
    {
        id: "u4",
        email: "leakhena.som@example.com",
        full_name: "Leakhena Som",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leakhena",
        role: "student",
        status: "Inactive",
        phone: "+855 88 111 222",
        created_at: "2024-01-10T09:00:00Z",
    },
    {
        id: "u5",
        email: "vibol.pen@example.com",
        full_name: "Vibol Pen",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vibol",
        role: "admin",
        status: "Inactive",
        phone: "+855 77 333 444",
        created_at: "2024-02-14T11:20:00Z",
    },
];

const UserTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{ id: string, name: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const itemsPerPage = 5;

    // Filter logic
    const filteredUsers = useMemo(() => {
        return MOCK_USERS.filter((user) => {
            const matchesSearch = user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === "all" || user.role === roleFilter;
            const matchesStatus = statusFilter === "all" || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [searchQuery, roleFilter, statusFilter]);

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedData = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDeleteClick = (id: string, name: string) => {
        setUserToDelete({ id, name });
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;
        setIsDeleting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`Deleted user: ${userToDelete.id}`);
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
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

            {/* Filters Bar */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-1 items-center gap-3 w-full max-w-2xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-outfit"
                        />
                    </div>

                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-10 gap-2 text-gray-600 rounded-xl border-gray-200">
                                    <ShieldCheck className="h-4 w-4" />
                                    {roleFilter === "all" ? "All Roles" : roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                <DropdownMenuItem onClick={() => setRoleFilter("all")}>All Roles</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setRoleFilter("admin")}>Admin</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setRoleFilter("student")}>Student</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setRoleFilter("recruiter")}>Recruiter</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-10 gap-2 text-gray-600 rounded-xl border-gray-200">
                                    <Filter className="h-4 w-4" />
                                    {statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Status</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("active")} className="text-green-600">Active</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter("Inactive")} className="text-amber-600">Inactive</DropdownMenuItem>

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
                        {paginatedData.length > 0 ? (
                            paginatedData.map((user) => (
                                <TableRow key={user.id} className="hover:bg-blue-50/10 transition-colors border-gray-50">
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm shrink-0">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserCircle className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-bold text-gray-900 truncate font-outfit">{user.full_name}</span>
                                                <span className="text-xs text-gray-500 truncate">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 border-none rounded-lg",
                                                user.status === "active" && "bg-green-100 text-green-700",
                                                user.status === "Inactive" && "bg-amber-100 text-amber-700",
                                            )}
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "p-1.5 rounded-lg shrink-0",
                                                user.role === "admin" ? "bg-purple-50" : user.role === "recruiter" ? "bg-indigo-50" : "bg-blue-50"
                                            )}>
                                                {user.role === "admin" ? <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> : <UserCircle className="w-3.5 h-3.5 text-blue-600" />}
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 capitalize font-outfit">{user.role}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Phone className="w-3 h-3 text-gray-400" />
                                                {user.phone}
                                            </div>
            
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500 font-medium">
                                        {new Date(user.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-100 rounded-xl">
                                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 rounded-2xl shadow-xl border-gray-100 p-2">
                                                <Link href={`/admin/users/${user.id}`}>
                                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5 rounded-lg">
                                                        <Eye className="h-4 w-4 text-blue-500" />
                                                        <span className="font-bold text-gray-700 text-xs">View Full Profile</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5 rounded-lg">
                                                    <Edit className="h-4 w-4 text-amber-500" />
                                                    <span className="font-bold text-gray-700 text-xs">Edit Account</span>
                                                </DropdownMenuItem>
                                              
                                              
                                                <DropdownMenuSeparator className="my-1 border-gray-50" />
                                                <DropdownMenuItem
                                                    className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 py-2.5 rounded-lg font-black"
                                                    onClick={() => handleDeleteClick(user.id, user.full_name)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="text-xs">Delete </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center bg-gray-50/20">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                                            <Search className="h-8 w-8 text-gray-300" />
                                        </div>
                                        <p className="text-base font-bold text-gray-500">No users found matching your search</p>
                                        <Button variant="link" className="text-blue-600 font-bold" onClick={() => { setSearchQuery(""); setRoleFilter("all"); setStatusFilter("all"); }}>
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
                        Total Users: <span className="text-gray-900">{filteredUsers.length}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-xl border-gray-200"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                                            : "text-gray-500 hover:bg-white"
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
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
