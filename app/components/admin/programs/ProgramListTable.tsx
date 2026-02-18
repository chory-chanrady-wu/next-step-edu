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
  Euro,
  PoundSterling,
  JapaneseYen,
} from "lucide-react";
import Link from "next/link";
import { useAllPrograms, useDeleteProgram } from "@/hooks/use-queries-hook";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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

const getDegreeLabel = (level?: number) => {
  if (!level) return "—";
  const found = DEGREE_LEVELS.find(d => d.value === level);
  return found?.label || `Level ${level}`;
};

const formatAmount = (amount?: number, currency: string = "USD") => {
  if (amount === undefined || amount === null) return <span>—</span>;
  const Icon = currencyIconMap[currency] || DollarSign;
  return (
    <div className="flex items-center gap-1 font-medium text-emerald-600">
      <Icon className="h-3.5 w-3.5" />
      <span>{amount.toLocaleString()}</span>
    </div>
  );
};

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

  // FIX: Improved filtering to search nested University and Faculty names
  const filteredData = React.useMemo(() => {
    if (!data) return [];
    let filtered = data;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.university.name.toLowerCase().includes(query) ||
          p.faculty.name.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
      );
    }

    if (degreeFilter !== "all") {
      const level = parseInt(degreeFilter);
      filtered = filtered.filter((p) => p.degreeLevel === level);
    }

    return filtered;
  }, [data, searchQuery, degreeFilter]);

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
    if (id === 0) return;

    deleteProgram(id, {
      // FIX: Modal closes only after the action is fully processed
      onSettled: () => {
        setShowDeleteModal(false);
        setProgramIdToDelete(0);
      },
      onSuccess: () => {
        toast.success("Program deleted successfully");
      },
      onError: (error: any) => {
        toast.error("Delete failed", {
          description: error?.response?.data?.message || "Please try again.",
        });
      }
    });
  };

  if (isLoading) return <ProgramSkeleton />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Programs
            </h1>
            <Badge variant="secondary" className="ml-2 bg-blue-50 text-blue-700">
              {filteredData.length} Total
            </Badge>
          </div>
          <p className="text-sm text-gray-500 ml-3">Manage academic catalogs and university offerings</p>
        </div>
        <Link href="/admin/programs/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
            <Plus className="mr-2 h-4 w-4" /> Create Program
          </Button>
        </Link>
      </div>

      {/* Global Deleting Overlay */}
      {onDeletingProgram && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium text-gray-700">Syncing deletion with production...</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <Card className="border-none shadow-sm bg-gray-50/50">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search programs, universities or faculties..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-9 bg-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Degree Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {DEGREE_LEVELS.map(l => <SelectItem key={l.value} value={l.value.toString()}>{l.label}</SelectItem>)}
                </SelectContent>
              </Select>
              {(searchQuery || degreeFilter !== "all") && (
                <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(""); setDegreeFilter("all"); }}>
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-none shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Tuition</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Scholarships</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((program) => (
                  <TableRow key={program.id} className="hover:bg-indigo-50/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-lg shadow-sm">
                          <AvatarFallback className={`rounded-lg bg-gradient-to-br ${getAvatarGradient(program.id)} text-white text-xs font-bold`}>
                            {program.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="max-w-[200px]">
                          <div className="font-semibold text-gray-900 truncate">{program.name}</div>
                          <div className="text-xs text-gray-500 truncate">{program.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 border-indigo-100">
                        {getDegreeLabel(program.degreeLevel)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <Building2 className="h-3.5 w-3.5 text-gray-400" />
                        {program.university.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <BookOpen className="h-3.5 w-3.5 text-gray-400" />
                        {program.faculty.name}
                      </div>
                    </TableCell>
                    <TableCell>{formatAmount(program.tuitionFeeAmount, program.currency)}</TableCell>
                    <TableCell className="text-sm text-gray-600">{program.studyPeriodMonths}m</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        <Users className="h-3 w-3 mr-1" /> {program.scholarshipCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/programs/edit/${program.id}`} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDeleteProgram(program.id)} className="p-2 text-gray-400 hover:text-rose-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center text-gray-500">No programs found matching filters.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination Logic (Included in your original, kept here for flow) */}
        {filteredData.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50/30">
            <p className="text-xs text-gray-500">Showing page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft size={16} /></Button>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight size={16} /></Button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
              <p className="text-sm text-gray-500 mt-2">This will permanently remove the program from the production database. This action is irreversible.</p>
              <div className="flex gap-3 w-full mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)} disabled={onDeletingProgram}>Cancel</Button>
                <Button variant="destructive" className="flex-1" onClick={() => handleConfirmDeleteProgram(programIdToDelete)} disabled={onDeletingProgram}>
                  {onDeletingProgram ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProgramSkeleton = () => (
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
              {/* Program column with avatar */}
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-12 w-12 rounded-xl bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-48 bg-gray-200" />
                  <Skeleton className="h-3 w-32 bg-gray-200" />
                </div>
              </div>
              {/* Degree column */}
              <Skeleton className="h-6 w-20 bg-gray-200" />
              {/* University column */}
              <Skeleton className="h-6 w-24 bg-gray-200" />
              {/* Faculty column */}
              <Skeleton className="h-6 w-24 bg-gray-200" />
              {/* Tuition column */}
              <Skeleton className="h-6 w-20 bg-gray-200" />
              {/* Duration column */}
              <Skeleton className="h-6 w-16 bg-gray-200" />
              {/* Scholarships column */}
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

export default TableListProgram;
