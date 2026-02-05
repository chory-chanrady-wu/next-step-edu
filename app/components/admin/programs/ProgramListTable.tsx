"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Filter,
  GraduationCap,
  Search,
  SortAsc,
  SortDesc,
  ChevronDown,
  Sparkles,
  MoreHorizontalIcon,
  Clock,
  DollarSign,
  BookOpen,
  Users,
  FileText,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import Link from "next/link";
import { usePrograms } from "@/hooks/admin-custom-hook";
import { ProgramSchemaType } from "@/app/lib/schema/program";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Helper function to format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to get program type based on study period
const getProgramType = (studyMonths: number) => {
  if (studyMonths <= 24) return "Short-term";
  if (studyMonths <= 48) return "Bachelor's";
  if (studyMonths <= 60) return "Master's";
  return "Doctoral";
};

// ========== COLUMNS DEFINITION ==========
export const columns: ColumnDef<ProgramSchemaType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Program Name
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const program = row.original;
      return (
        <div className="flex items-start gap-3 py-1">
          <Avatar className="h-10 w-10 rounded-lg border">
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold">
              {program.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <div className="font-semibold text-sm flex items-center gap-2 text-gray-900">
              {program.exam_required && (
                <Sparkles className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
              )}
              <span className="truncate">{program.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
              <BookOpen className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">
                {getProgramType(program.study_period_months)}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tuition_fee_amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Tuition Fee
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const program = row.original;
      const formatted = formatCurrency(
        program.tuition_fee_amount,
        program.currency
      );

      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="font-bold text-sm text-emerald-600">{formatted}</div>
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 h-4 w-fit border-gray-200 text-gray-700"
          >
            Per Year
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "study_period_months",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Duration
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const months = row.getValue("study_period_months") as number;
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;

      return (
        <div className="flex flex-col justify-center gap-1">
          <div className="font-medium text-sm text-gray-900">
            {years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}
            {remainingMonths > 0
              ? `${years > 0 ? ", " : ""}${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
              : ""}
          </div>
          <div className="text-xs font-medium text-gray-500">
            ({months} months total)
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "exam_required",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Exam Required
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const examRequired = row.getValue("exam_required") as boolean;
      const config = examRequired
        ? {
            label: "Required",
            color: "bg-blue-50 text-blue-700 border-blue-200",
          }
        : {
            label: "Not Required",
            color: "bg-gray-50 text-gray-600 border-gray-200",
          };

      return (
        <div className="flex justify-center items-center">
          <Badge
            variant="outline"
            className={`font-medium text-xs px-2.5 ${config.color}`}
          >
            {config.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "eligibility",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Eligibility
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const eligibility = row.original.eligibility;

      return (
        <div className="flex flex-col gap-1.5">
          <div className="text-xs text-gray-900">
            {
              // eligibility.map(item=> (item))
            }
          </div>
          <div className="flex flex-wrap gap-1">
            {eligibility?.slice(0, 2).map((req, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-4 bg-gray-50 text-gray-700 border-gray-200"
              >
                {req.length > 15 ? `${req.substring(0, 15)}...` : req}
              </Badge>
            ))}
            {eligibility?.length > 2 && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-4 bg-gray-50 text-gray-500 border-gray-200"
              >
                +{eligibility.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const program = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="cursor-pointer shadow-none outline-0 ring-0"
              aria-label="Open menu"
            >
              <MoreHorizontalIcon size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Program Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href={`/admin/programs/${program.id}`}>
                <DropdownMenuItem>
                  View Details
                  <DropdownMenuShortcut>⇧⌘V</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/programs/edit/${program.id}`}>
                <DropdownMenuItem>
                  Edit Program
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 hover:text-red-600"
              onClick={async () => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this program?"
                );
                if (confirmed) {
                  try {
                    // await deleteProgramMutation.mutateAsync(program.id);
                  } catch (error) {
                    console.error("Failed to delete program:", error);
                  }
                }
              }}
            >
              Delete Program
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ========== MAIN COMPONENT ==========
export const ProgramListTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { isLoading, data: programsData } = usePrograms();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: React.useMemo(
      () => (programsData && Array.isArray(programsData) ? programsData : []),
      [programsData]
    ),
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mt-3">
      <div className="mx-auto space-y-6">
        {/* Filters and Controls */}
        <div className="border-gray-200 rounded-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by program name, description, or eligibility..."
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-10 shadow-none rounded focus-visible:ring-transparent focus-visible:ring-offset-0 h-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 shadow-none rounded focus-visible:ring-transparent focus-visible:ring-offset-0 h-10"
                  >
                    <Filter className="h-4 w-4" />
                    Filter Exam
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
                    Filter by Exam Requirement
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={
                      table
                        .getColumn("exam_required")
                        ?.getFilterValue() === undefined
                    }
                    onCheckedChange={() =>
                      table.getColumn("exam_required")?.setFilterValue(undefined)
                    }
                  >
                    All Programs
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={
                      table.getColumn("exam_required")?.getFilterValue() ===
                      true
                    }
                    onCheckedChange={() =>
                      table.getColumn("exam_required")?.setFilterValue(true)
                    }
                  >
                    Exam Required
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={
                      table.getColumn("exam_required")?.getFilterValue() ===
                      false
                    }
                    onCheckedChange={() =>
                      table.getColumn("exam_required")?.setFilterValue(false)
                    }
                  >
                    No Exam Required
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-gray-200 bg-gray-50/50 hover:bg-gray-50/50"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="font-semibold text-gray-700 text-xs uppercase tracking-wider h-12"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3.5">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-96 text-center"
                    >
                      <div className="flex flex-col items-center justify-center text-gray-500 py-12">
                        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-semibold text-gray-600 mb-1">
                          No programs found
                        </p>
                        <p className="text-sm text-gray-500 max-w-md">
                          Try adjusting your search or filters to find what you are
                          looking for.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setGlobalFilter("");
                            setColumnFilters([]);
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
          </div>

          {/* Footer - Pagination & Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-200 bg-gray-50/50">
            <div className="text-sm text-gray-600 mb-4 sm:mb-0">
              <div className="flex items-center gap-2">
                <span>
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected
                </span>
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setRowSelection({})}
                  >
                    Clear selection
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 shadow-none focus-visible:ring-transparent rounded focus-visible:ring-offset-0 w-16"
                    >
                      {table.getState().pagination.pageSize}
                      <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <DropdownMenuItem
                        key={pageSize}
                        onClick={() => table.setPageSize(Number(pageSize))}
                      >
                        {pageSize}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 rounded w-8"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Previous page</span>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 rounded w-8"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Next page</span>
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
