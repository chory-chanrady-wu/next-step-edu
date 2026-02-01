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
    Globe,
    MapPin,
    MoreVertical,
    ExternalLink,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Download,
    Star
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

const MOCK_UNIVERSITIES = [
    {
        id: "1",
        name: "Royal University of Phnom Penh",
        slug: "rupp",
        logo_url: "http://rupp.edu.kh/images/rupp-logo.png",
        country: "Cambodia",
        city: "Phnom Penh",
        status: "active",
        tuition_rank: 1,
        official_website: "http://www.rupp.edu.kh",
        created_at: "2024-01-01",
    },
    {
        id: "2",
        name: "Zaman University",
        slug: "zaman",
        logo_url: "https://www.paragoniu.edu.kh/wp-content/uploads/2022/01/paragon-logo-2@2x.png",
        country: "Cambodia",
        city: "Phnom Penh",
        status: "active",
        tuition_rank: 2,
        official_website: "https://paragoniu.edu.kh",
        created_at: "2024-01-05",
    },
    {
        id: "3",
        name: "National University of Singapore",
        slug: "nus",
        logo_url: "https://static.wixstatic.com/media/da9e74_568fe84a19b243ffbed35849f4ca9216~mv2.png/v1/fill/w_384,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/da9e74_568fe84a19b243ffbed35849f4ca9216~mv2.png",
        country: "Singapore",
        city: "Singapore",
        status: "inactive",
        tuition_rank: 3,
        official_website: "https://www.nus.edu.sg",
        created_at: "2024-02-10",
    },
    {
        id: "4",
        name: "Institute of Technology of Cambodia",
        slug: "itc",
        logo_url: "https://itc.edu.kh/wp-content/uploads/2021/02/cropped-Logo-ITC.png",
        country: "Cambodia",
        city: "Phnom Penh",
        status: "active",
        tuition_rank: 1,
        official_website: "http://www.itc.edu.kh",
        created_at: "2024-03-15",
    },
    {
        id: "5",
        name: "American University of Phnom Penh",
        slug: "aupp",
        logo_url: "https://www.aupp.edu.kh/wp-content/uploads/2023/05/AUPP-Logo.png",
        country: "Cambodia",
        city: "Phnom Penh",
        status: "active",
        tuition_rank: 4,
        official_website: "https://www.aupp.edu.kh",
        created_at: "2024-04-20",
    },
];

const UniversityTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [universityToDelete, setUniversityToDelete] = useState<{ id: string, name: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const itemsPerPage = 5;
    const filteredUniversities = useMemo(() => {
        return MOCK_UNIVERSITIES.filter((uni) => {
            const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                uni.city.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || uni.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, statusFilter]);
    const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
    const paginatedData = filteredUniversities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDeleteClick = (id: string, name: string) => {
        setUniversityToDelete({ id, name });
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!universityToDelete) return;
        setIsDeleting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`Deleted university: ${universityToDelete.id}`);
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        setUniversityToDelete(null);
    };

    return (
        <div className="space-y-4">
            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete University"
                description={`Are you sure you want to delete "${universityToDelete?.name}"? This will permanently remove the record and all associated data from the system.`}
                isLoading={isDeleting}
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
                            <Button variant="outline" size="sm" className="h-9 gap-2 text-gray-600 rounded-lg">
                                <Filter className="h-4 w-4" />
                                {statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl">
                            <DropdownMenuItem onClick={() => setStatusFilter("all")} className="cursor-pointer font-medium">All Status</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("active")} className="cursor-pointer font-medium text-green-600">Active</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("inactive")} className="cursor-pointer font-medium text-gray-600">Inactive</DropdownMenuItem>
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
                            <TableHead>Tuition Rank</TableHead>
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
                                <TableRow key={uni.id} className="hover:bg-blue-50/20 transition-colors border-gray-100">
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm shrink-0">
                                                {uni.logo_url ? (
                                                    <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-contain p-2" />
                                                ) : (
                                                    <Globe className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-bold text-gray-900 truncate font-outfit">{uni.name}</span>
                                                <a
                                                    href={uni.official_website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-500 flex items-center gap-1 hover:underline group w-fit"
                                                >
                                                    {uni.slug}.edu <ExternalLink className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                </a>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="p-1.5 bg-green-50 rounded-lg shrink-0">
                                                <MapPin className="w-3.5 h-3.5 text-green-600" />
                                            </div>
                                            <span className="truncate">{uni.city}, {uni.country}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-0.5 group">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "w-3.5 h-3.5 transition-colors duration-200",
                                                        i < uni.tuition_rank
                                                            ? 'fill-amber-400 text-amber-400'
                                                            : 'text-gray-200'
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={uni.status === "active" ? "default" : "secondary"}
                                            className={cn(
                                                "font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 border-none",
                                                uni.status === "active"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                                            )}
                                        >
                                            {uni.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500 font-medium">
                                        {new Date(uni.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-lg">
                                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl border-gray-100">
                                                <Link href={`/admin/universities/${uni.id}`}>
                                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5 font-medium">
                                                        <Eye className="h-4 w-4 text-blue-500" />
                                                        <span className="text-gray-700">View Details</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href={`/admin/universities/${uni.id}/edit`}>
                                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2.5 font-medium">
                                                        <Edit className="h-4 w-4 text-amber-500" />
                                                        <span className="text-gray-700">Edit University</span>
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
                                <TableCell colSpan={6} className="h-48 text-center bg-gray-50/30">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Search className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-500">No universities found matching your criteria.</p>
                                        <Button variant="link" size="sm" onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}>
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
                        Showing <span className="text-gray-900 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(currentPage * itemsPerPage, filteredUniversities.length)}</span> of <span className="text-gray-900 font-bold">{filteredUniversities.length}</span> entries
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-lg hover:bg-white border-gray-200"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                                            : "text-gray-400 hover:bg-white hover:text-gray-900"
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
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
