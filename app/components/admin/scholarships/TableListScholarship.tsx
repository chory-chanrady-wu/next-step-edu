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
  MoreHorizontal,
  ExternalLink,
  Eye,
  Download,
  Star,
  Clock,
  Award,
  Target,
  Sparkles,
  TrendingDown,
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ========== TYPES ==========
export type Scholarship = {
  id: string;
  name: string;
  provider: string;
  providerLogo?: string;
  amount: number;
  currency: string;
  status: "open" | "closed" | "upcoming" | "extended";
  category:
  | "academic"
  | "sports"
  | "arts"
  | "stem"
  | "need-based"
  | "merit"
  | "minority"
  | "community";
  deadline: string;
  applicants: number;
  maxApplicants?: number;
  eligibility: string[];
  awardType: "full" | "partial" | "tuition" | "stipend";
  educationLevel: "undergraduate" | "graduate" | "phd" | "high-school" | "all";
  renewable: boolean;
  website: string;
  featured: boolean;
  rating: number;
  lastUpdated: string;
  tags: string[];
  applicationFee: boolean;
  documentsRequired: string[];
  location: string;
  international: boolean;
};

// ========== SAMPLE DATA ==========
const data: Scholarship[] = [
  {
    id: "sch-001",
    name: "Asian Scholarship Fund",
    provider: "Asian Scholarship Foundation",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=ASF",
    amount: 10000,
    currency: "USD",
    status: "open",
    category: "merit",
    deadline: "2024-12-31",
    applicants: 245,
    maxApplicants: 500,
    eligibility: ["GPA 3.0+", "Asian descent", "Undergraduate"],
    awardType: "partial",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: true,
    rating: 4.5,
    lastUpdated: "2024-01-15",
    tags: ["Merit-based", "Leadership", "Community Service"],
    applicationFee: false,
    documentsRequired: ["Transcript", "Essay", "Recommendation"],
    location: "USA",
    international: true,
  },
  {
    id: "sch-002",
    name: "STEM Innovation Award",
    provider: "TechCorp International",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp",
    amount: 25000,
    currency: "USD",
    status: "open",
    category: "stem",
    deadline: "2024-10-15",
    applicants: 89,
    maxApplicants: 200,
    eligibility: ["STEM Major", "Project Proposal", "GPA 3.5+"],
    awardType: "full",
    educationLevel: "graduate",
    renewable: false,
    website: "https://example.com",
    featured: true,
    rating: 4.8,
    lastUpdated: "2024-01-10",
    tags: ["Technology", "Research", "Innovation"],
    applicationFee: true,
    documentsRequired: ["Research Proposal", "CV", "References"],
    location: "Global",
    international: true,
  },
  {
    id: "sch-003",
    name: "Women in Engineering",
    provider: "Women Tech Council",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=WTC",
    amount: 15000,
    currency: "USD",
    status: "upcoming",
    category: "minority",
    deadline: "2024-03-01",
    applicants: 0,
    maxApplicants: 150,
    eligibility: ["Female", "Engineering Major", "Sophomore+"],
    awardType: "tuition",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: false,
    rating: 4.7,
    lastUpdated: "2024-01-05",
    tags: ["Women", "Engineering", "Diversity"],
    applicationFee: false,
    documentsRequired: ["Essay", "Portfolio", "Transcript"],
    location: "USA",
    international: false,
  },
  {
    id: "sch-004",
    name: "Community Service Grant",
    provider: "Local Community Foundation",
    amount: 5000,
    currency: "USD",
    status: "open",
    category: "community",
    deadline: "2024-06-30",
    applicants: 156,
    maxApplicants: 300,
    eligibility: ["100+ Service Hours", "Local Resident"],
    awardType: "stipend",
    educationLevel: "all",
    renewable: true,
    website: "https://example.com",
    featured: false,
    rating: 4.2,
    lastUpdated: "2023-12-20",
    tags: ["Community", "Service", "Local"],
    applicationFee: false,
    documentsRequired: ["Service Log", "Recommendation"],
    location: "California, USA",
    international: false,
  },
  {
    id: "sch-005",
    name: "International Arts Fellowship",
    provider: "Global Arts Initiative",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=Arts",
    amount: 20000,
    currency: "EUR",
    status: "closed",
    category: "arts",
    deadline: "2023-11-30",
    applicants: 312,
    maxApplicants: 300,
    eligibility: ["Portfolio Review", "Art Major"],
    awardType: "full",
    educationLevel: "graduate",
    renewable: false,
    website: "https://example.com",
    featured: false,
    rating: 4.6,
    lastUpdated: "2023-11-15",
    tags: ["Arts", "International", "Fellowship"],
    applicationFee: true,
    documentsRequired: ["Portfolio", "Artist Statement", "Transcript"],
    location: "Europe",
    international: true,
  },
  {
    id: "sch-006",
    name: "Football Excellence Scholarship",
    provider: "Sports Development Association",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=Football",
    amount: 15000,
    currency: "USD",
    status: "open",
    category: "sports",
    deadline: "2024-08-15",
    applicants: 78,
    maxApplicants: 100,
    eligibility: ["Varsity Football Player", "GPA 2.5+"],
    awardType: "partial",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: true,
    rating: 4.3,
    lastUpdated: "2024-01-20",
    tags: ["Football", "Athletics", "Sports"],
    applicationFee: true,
    documentsRequired: [
      "Athletic Records",
      "Coach Recommendation",
      "Transcript",
    ],
    location: "USA",
    international: false,
  },
  {
    id: "sch-007",
    name: "Low-Income Family Support",
    provider: "Education for All Foundation",
    amount: 8000,
    currency: "USD",
    status: "open",
    category: "need-based",
    deadline: "2024-07-31",
    applicants: 189,
    maxApplicants: 250,
    eligibility: ["Family Income < $50k", "First-generation", "GPA 2.8+"],
    awardType: "partial",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: false,
    rating: 4.4,
    lastUpdated: "2024-02-01",
    tags: ["Need-based", "Financial Aid", "Support"],
    applicationFee: false,
    documentsRequired: ["Tax Returns", "FAFSA", "Personal Statement"],
    location: "USA",
    international: false,
  },
  {
    id: "sch-008",
    name: "Academic Excellence Award",
    provider: "National Honor Society",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=NHS",
    amount: 10000,
    currency: "USD",
    status: "open",
    category: "academic",
    deadline: "2024-05-15",
    applicants: 245,
    maxApplicants: 500,
    eligibility: ["GPA 3.9+", "SAT 1450+", "Leadership"],
    awardType: "full",
    educationLevel: "high-school",
    renewable: false,
    website: "https://example.com",
    featured: true,
    rating: 4.7,
    lastUpdated: "2024-02-05",
    tags: ["Academic", "Excellence", "Merit"],
    applicationFee: false,
    documentsRequired: ["Transcript", "Test Scores", "Essay"],
    location: "USA",
    international: false,
  },
  {
    id: "sch-009",
    name: "African American STEM Scholars",
    provider: "Diversity in STEM Initiative",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=STEMDiversity",
    amount: 20000,
    currency: "USD",
    status: "open",
    category: "minority",
    deadline: "2024-09-30",
    applicants: 67,
    maxApplicants: 100,
    eligibility: ["African American", "STEM Major", "GPA 3.2+"],
    awardType: "tuition",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: true,
    rating: 4.6,
    lastUpdated: "2024-02-10",
    tags: ["Minority", "STEM", "Diversity"],
    applicationFee: false,
    documentsRequired: ["Personal Essay", "Transcript", "Recommendation"],
    location: "USA",
    international: false,
  },
  {
    id: "sch-010",
    name: "PhD Research Fellowship",
    provider: "Advanced Studies Institute",
    amount: 35000,
    currency: "USD",
    status: "open",
    category: "academic",
    deadline: "2024-11-15",
    applicants: 45,
    maxApplicants: 60,
    eligibility: ["PhD Candidate", "Research Proposal", "Publications"],
    awardType: "stipend",
    educationLevel: "phd",
    renewable: true,
    website: "https://example.com",
    featured: true,
    rating: 4.8,
    lastUpdated: "2024-02-15",
    tags: ["PhD", "Research", "Fellowship"],
    applicationFee: true,
    documentsRequired: ["Research Proposal", "CV", "Publications"],
    location: "Global",
    international: true,
  },
  {
    id: "sch-011",
    name: "Basketball Athletic Scholarship",
    provider: "College Sports Association",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=Basketball",
    amount: 18000,
    currency: "USD",
    status: "open",
    category: "sports",
    deadline: "2024-04-15",
    applicants: 92,
    maxApplicants: 120,
    eligibility: ["Varsity Basketball", "GPA 2.7+", "Coach Endorsement"],
    awardType: "partial",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: false,
    rating: 4.2,
    lastUpdated: "2024-02-20",
    tags: ["Basketball", "Sports", "Athletics"],
    applicationFee: true,
    documentsRequired: ["Game Stats", "Coach Letter", "Transcript"],
    location: "USA",
    international: true,
  },
  {
    id: "sch-012",
    name: "Music Composition Award",
    provider: "National Arts Council",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=MusicComp",
    amount: 12000,
    currency: "USD",
    status: "upcoming",
    category: "arts",
    deadline: "2024-05-01",
    applicants: 0,
    maxApplicants: 50,
    eligibility: ["Music Composition Major", "Portfolio"],
    awardType: "partial",
    educationLevel: "graduate",
    renewable: false,
    website: "https://example.com",
    featured: true,
    rating: 4.5,
    lastUpdated: "2024-02-25",
    tags: ["Music", "Composition", "Arts"],
    applicationFee: true,
    documentsRequired: ["Portfolio", "Scores", "Recommendation"],
    location: "USA",
    international: true,
  },
  {
    id: "sch-013",
    name: "Computer Science Merit Scholarship",
    provider: "Tech Education Foundation",
    amount: 15000,
    currency: "USD",
    status: "open",
    category: "merit",
    deadline: "2024-10-31",
    applicants: 156,
    maxApplicants: 200,
    eligibility: ["CS Major", "GPA 3.7+", "Coding Projects"],
    awardType: "tuition",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: true,
    rating: 4.7,
    lastUpdated: "2024-03-01",
    tags: ["Computer Science", "Merit", "Technology"],
    applicationFee: false,
    documentsRequired: ["Coding Portfolio", "Transcript", "Essay"],
    location: "Global",
    international: true,
  },
  {
    id: "sch-014",
    name: "Rural Community Scholarship",
    provider: "Rural Education Fund",
    amount: 6000,
    currency: "USD",
    status: "open",
    category: "community",
    deadline: "2024-06-15",
    applicants: 89,
    maxApplicants: 150,
    eligibility: ["Rural Area Resident", "Community Service"],
    awardType: "partial",
    educationLevel: "all",
    renewable: true,
    website: "https://example.com",
    featured: false,
    rating: 4.3,
    lastUpdated: "2024-03-05",
    tags: ["Rural", "Community", "Local"],
    applicationFee: false,
    documentsRequired: ["Proof of Residence", "Community Service Log"],
    location: "Midwest, USA",
    international: false,
  },
  {
    id: "sch-015",
    name: "Physics Research Grant (Extended)",
    provider: "Physics Association",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=Physics",
    amount: 22000,
    currency: "USD",
    status: "extended",
    deadline: "2024-04-30",
    category: "stem",
    applicants: 34,
    maxApplicants: 40,
    eligibility: ["Physics Major", "Research Experience", "GPA 3.6+"],
    awardType: "full",
    educationLevel: "phd",
    renewable: false,
    website: "https://example.com",
    featured: true,
    rating: 4.8,
    lastUpdated: "2024-03-10",
    tags: ["Physics", "Research", "STEM"],
    applicationFee: true,
    documentsRequired: ["Research Proposal", "Publications", "Transcript"],
    location: "Global",
    international: true,
  },
  {
    id: "sch-016",
    name: "Indigenous Peoples Scholarship",
    provider: "Native American Education Fund",
    amount: 7500,
    currency: "USD",
    status: "open",
    category: "minority",
    deadline: "2024-07-31",
    applicants: 45,
    maxApplicants: 80,
    eligibility: ["Native American Heritage", "Community Involvement"],
    awardType: "partial",
    educationLevel: "all",
    renewable: true,
    website: "https://example.com",
    featured: false,
    rating: 4.5,
    lastUpdated: "2024-03-15",
    tags: ["Indigenous", "Minority", "Community"],
    applicationFee: false,
    documentsRequired: ["Tribal Enrollment", "Essay", "Transcript"],
    location: "USA",
    international: false,
  },
  {
    id: "sch-017",
    name: "Mathematics Olympiad Scholarship",
    provider: "International Math Society",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=MathOlympiad",
    amount: 10000,
    currency: "USD",
    status: "closed",
    category: "academic",
    deadline: "2023-12-01",
    applicants: 189,
    maxApplicants: 200,
    eligibility: ["Math Olympiad Participant", "GPA 3.8+"],
    awardType: "partial",
    educationLevel: "high-school",
    renewable: false,
    website: "https://example.com",
    featured: false,
    rating: 4.6,
    lastUpdated: "2023-11-30",
    tags: ["Mathematics", "Competition", "Academic"],
    applicationFee: false,
    documentsRequired: ["Olympiad Results", "Transcript", "Essay"],
    location: "Global",
    international: true,
  },
  {
    id: "sch-018",
    name: "Visual Arts Scholarship",
    provider: "Contemporary Arts Foundation",
    amount: 14000,
    currency: "USD",
    status: "open",
    category: "arts",
    deadline: "2024-08-31",
    applicants: 67,
    maxApplicants: 100,
    eligibility: ["Visual Arts Major", "Portfolio Submission"],
    awardType: "partial",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: true,
    rating: 4.4,
    lastUpdated: "2024-03-20",
    tags: ["Visual Arts", "Painting", "Sculpture"],
    applicationFee: true,
    documentsRequired: ["Portfolio", "Artist Statement", "Transcript"],
    location: "USA",
    international: true,
  },
  {
    id: "sch-019",
    name: "Engineering Merit Award",
    provider: "Engineering Society",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=Engineering",
    amount: 18000,
    currency: "USD",
    status: "open",
    category: "merit",
    deadline: "2024-09-15",
    applicants: 123,
    maxApplicants: 150,
    eligibility: ["Engineering Major", "GPA 3.5+", "Projects"],
    awardType: "tuition",
    educationLevel: "graduate",
    renewable: false,
    website: "https://example.com",
    featured: false,
    rating: 4.7,
    lastUpdated: "2024-03-25",
    tags: ["Engineering", "Merit", "Technology"],
    applicationFee: false,
    documentsRequired: ["Project Portfolio", "Transcript", "Recommendation"],
    location: "Global",
    international: true,
  },
  {
    id: "sch-020",
    name: "Swimming Sports Scholarship",
    provider: "Aquatic Sports Association",
    providerLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=Swimming",
    amount: 12000,
    currency: "USD",
    status: "upcoming",
    category: "sports",
    deadline: "2024-04-01",
    applicants: 0,
    maxApplicants: 30,
    eligibility: ["Competitive Swimmer", "Meet Times", "GPA 2.8+"],
    awardType: "partial",
    educationLevel: "undergraduate",
    renewable: true,
    website: "https://example.com",
    featured: true,
    rating: 4.3,
    lastUpdated: "2024-03-30",
    tags: ["Swimming", "Sports", "Athletics"],
    applicationFee: true,
    documentsRequired: ["Swim Times", "Coach Recommendation", "Transcript"],
    location: "USA",
    international: false,
  },
];

// ========== COLUMNS DEFINITION ==========
export const columns: ColumnDef<Scholarship>[] = [
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
        className="font-semibold -ml-4 hover:bg-transparent "
      >
        Scholarship
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const scholarship = row.original;
      return (
        <div className="flex items-start gap-3 py-1">
          <Avatar className="h-10 w-10 rounded-lg border">
            <AvatarImage
              src={scholarship.providerLogo}
              alt={scholarship.provider}
            />
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold">
              {scholarship.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <div className="font-semibold text-sm flex items-center gap-2 text-gray-900">
              {scholarship.featured && (
                <Sparkles className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
              )}
              <span className="truncate">{scholarship.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
              <GraduationCap className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{scholarship.provider}</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Award Amount
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const currency = row.original.currency;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);

      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="font-bold text-sm text-emerald-600">{formatted}</div>
          {row.original.renewable && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 w-fit border-emerald-200 text-emerald-700"
            >
              Renewable
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Status
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusConfig = (status: string) => {
        const config = {
          open: {
            label: "Open",
            color: "bg-emerald-50 text-emerald-700 border-emerald-200 border",
          },
          closed: {
            label: "Closed",
            color:
              "bg-gray-50 text-gray-600 border-gray-200 ring-1 ring-gray-600/10",
          },
          upcoming: {
            label: "Upcoming",
            color:
              "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-600/10",
          },
          extended: {
            label: "Extended",
            color:
              "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-600/10",
          },
        };
        return config[status as keyof typeof config] || config.open;
      };

      const config = getStatusConfig(status);
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
    accessorKey: "deadline",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Deadline
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const deadline = new Date(row.getValue("deadline"));
      const today = new Date();
      const daysLeft = Math.ceil(
        (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      const formattedDate = deadline.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return (
        <div className="flex flex-col justify-center gap-1">
          <div className="font-medium text-sm text-gray-900">
            {formattedDate}
          </div>
          <div
            className={`text-xs font-medium ${daysLeft <= 7 && daysLeft > 0 ? "text-red-600" : daysLeft > 0 ? "text-gray-500" : "text-gray-400"}`}
          >
            {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "applicants",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Applicants
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const scholarship = row.original;
      const applicants = scholarship.applicants;
      const maxApplicants = scholarship.maxApplicants;
      const percentage = maxApplicants ? (applicants / maxApplicants) * 100 : 0;

      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center  text-xs">
            <span className="font-semibold text-gray-900">
              {applicants.toLocaleString()}
            </span>
            {maxApplicants && (
              <span className="text-gray-500">
                / {maxApplicants.toLocaleString()}
              </span>
            )}
          </div>
          {maxApplicants && (
            <div className="flex items-center gap-2">
              <Progress value={percentage} className="h-1.5 flex-1" />
              <span
                className={`text-[10px] font-medium ${percentage >= 80 ? "text-red-600" : "text-gray-500"}`}
              >
                {Math.round(percentage)}%
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-semibold -ml-4 hover:bg-transparent"
      >
        Category
        {column.getIsSorted() === "asc" ? (
          <SortAsc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : column.getIsSorted() === "desc" ? (
          <SortDesc className="ml-2 h-3.5 w-3.5 opacity-50" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      const categoryColors: Record<string, string> = {
        academic: "bg-blue-50 text-blue-700 border-blue-200",
        stem: "bg-purple-50 text-purple-700 border-purple-200",
        arts: "bg-pink-50 text-pink-700 border-pink-200",
        sports: "bg-emerald-50 text-emerald-700 border-emerald-200",
        "need-based": "bg-amber-50 text-amber-700 border-amber-200",
        merit: "bg-indigo-50 text-indigo-700 border-indigo-200",
        minority: "bg-rose-50 text-rose-700 border-rose-200",
        community: "bg-teal-50 text-teal-700 border-teal-200",
      };

      return (
        <div className="flex items-center justify-center">
          <Badge
            variant="outline"
            className={`capitalize text-xs px-2.5 font-medium ${categoryColors[category] || "bg-gray-50 text-gray-700"}`}
          >
            {category.replace("-", " ")}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const scholarship = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
              Quick Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => window.open(scholarship.website, "_blank")}
                className="cursor-pointer"
              >
                <ExternalLink className="mr-2 h-4 w-4 text-gray-500" />
                <span>Open Scholarship Page</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 text-gray-500" />
                <span>View Full Details</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Download className="mr-2 h-4 w-4 text-gray-500" />
              <span>Download Requirements</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ========== MAIN COMPONENT ==========
export const TableListScholarship = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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

  return (
    <div className="w-full min-h-screen mt-3">
      <div className=" mx-auto space-y-6">
        {/* Filters and Controls */}
        <div className=" border-gray-200 rounded-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, provider, or category..."
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
                    Filter Status
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
                    Filter by Status
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={
                      table.getColumn("status")?.getFilterValue() === undefined
                    }
                    onCheckedChange={() =>
                      table.getColumn("status")?.setFilterValue(undefined)
                    }
                  >
                    All Statuses
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={
                      table.getColumn("status")?.getFilterValue() === "open"
                    }
                    onCheckedChange={() =>
                      table.getColumn("status")?.setFilterValue("open")
                    }
                  >
                    Open Only
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={
                      table.getColumn("status")?.getFilterValue() === "upcoming"
                    }
                    onCheckedChange={() =>
                      table.getColumn("status")?.setFilterValue("upcoming")
                    }
                  >
                    Upcoming
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className=" border rounded overflow-hidden">
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
                        className="font-semibold text-gray-700 text-xs uppercase tracking-wider h-12 text-center" // Add text-center here
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                            cell.getContext(),
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
                          No scholarships found
                        </p>
                        <p className="text-sm text-gray-500 max-w-md">
                          Try adjusting your search or filters to find what you
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
