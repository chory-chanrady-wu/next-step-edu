"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Calendar,
    MapPin,
    Globe,
    Star,
    Users,
    GraduationCap,
    FileText,
    ExternalLink,
    Clock,
    Award,
    CheckCircle2,
    DollarSign,
    Sparkles,
    Edit,
    Trash2,
    Download,
    Eye,
    BarChart3,
    UserCheck,
    Loader2,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Statistic } from "antd";
import { Tag, Alert, Modal } from "antd";
import type { ModalProps } from "antd";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { OverviewScholarship } from "./OverviewScholarship";
import ScholarshipStats from "./ScholarshipStats";
import Link from "next/link";
import { useScholarship } from "@/hooks/admin-custom-hook";
import { ScholarshipType } from "@/app/lib/types";

interface ScholarshipDetailProps {
    id: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onStatusChange?: (id: string, status: string) => void;
    onExport?: (id: string) => void;
}

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "open":
            return "success";
        case "closed":
            return "error";
        case "upcoming":
            return "warning";
        default:
            return "default";
    }
};

const getAwardTypeLabel = (type: string) => {
    switch (type) {
        case "full":
            return "Full Scholarship";
        case "partial":
            return "Partial Scholarship";
        case "merit":
            return "Merit-Based";
        default:
            return type;
    }
};

export function ScholarshipDetailAdmin({
    onEdit,
    onDelete,
    id,
    onStatusChange,
    onExport,
}: ScholarshipDetailProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [exportModalOpen, setExportModalOpen] = useState(false);

    const { isLoading, data: scholarship, error } = useScholarship(id);

    // Calculate days until deadline safely
    const calculateDaysUntilDeadline = () => {
        if (!scholarship?.deadline) return 0;
        const deadlineDate = new Date(scholarship.deadline);
        if (isNaN(deadlineDate.getTime())) return 0;

        const today = new Date();
        const timeDiff = deadlineDate.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };

    const applicantProgress = scholarship
        ? (scholarship.applicants / (scholarship.maxApplicants || 1)) * 100
        : 0;

    const daysUntilDeadline = calculateDaysUntilDeadline();

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        onDelete?.(scholarship?.id || "");
        setDeleteModalOpen(false);
    };

    const handleExport = () => {
        setExportModalOpen(true);
    };

    const confirmExport = () => {
        onExport?.(scholarship?.id || "");
        setExportModalOpen(false);
    };

    const renderStats = () => (
        <div className="grid gap-4 mb-6">
            <ScholarshipStats
                totalApplications={500}
                shortlisted={75}
                awarded={25}
                saved={120}
            />
        </div>
    );

    // Handle loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading scholarship details...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error || !scholarship) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Alert
                        message="Error"
                        description={error?.message || "Scholarship not found"}
                        type="error"
                        showIcon
                    />
                    <Button onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Admin Actions Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        Scholarship Details
                    </h1>
                    <p className="text-muted-foreground">Manage and view scholarship details</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/scholarships/edit/${scholarship.id}`}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit?.(scholarship.id)}
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            {renderStats()}

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid rounded w-full grid-cols-3 lg:w-auto lg:inline-flex">
                    <TabsTrigger value="overview" className="rounded">Overview</TabsTrigger>
                    <TabsTrigger value="applications" className="rounded">Applications</TabsTrigger>
                    <TabsTrigger value="analytics" className="rounded">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Main Card */}
                    <Card className="rounded shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-start gap-3 py-1">
                                <Avatar className="h-16 w-16 rounded-lg border">
                                    <AvatarImage
                                        src={scholarship.providerLogo}
                                        alt={scholarship.provider}
                                    />
                                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold">
                                        {scholarship.name?.substring(0, 2).toUpperCase()}
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
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Award Amount</p>
                                <p className="text-3xl font-bold text-primary">
                                    {formatCurrency(scholarship.amount, scholarship.currency)}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Quick Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <GraduationCap className="w-4 h-4" />
                                        Education Level
                                    </p>
                                    <p className="font-medium capitalize">{scholarship.educationLevel}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        Location
                                    </p>
                                    <p className="font-medium">{scholarship.location}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Award className="w-4 h-4" />
                                        Award Type
                                    </p>
                                    <p className="font-medium">{getAwardTypeLabel(scholarship.awardType)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        Deadline
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{formatDate(scholarship.deadline)}</p>
                                        <Badge variant={daysUntilDeadline < 30 ? "destructive" : "secondary"}>
                                            {daysUntilDeadline > 0 ? `${daysUntilDeadline}d left` : "Expired"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Applicants Progress */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-muted-foreground" />
                                        <h3 className="font-semibold">Applicants Progress</h3>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {scholarship.applicants} / {scholarship.maxApplicants} applied
                                    </span>
                                </div>
                                <Progress value={applicantProgress} className="h-2" />
                                <div className="flex justify-between text-sm">
                                    <span>0%</span>
                                    <span>{applicantProgress.toFixed(1)}%</span>
                                    <span>100%</span>
                                </div>
                            </div>

                            <Separator />

                            {/* Details Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Eligibility */}
                                <div className="space-y-3 flex flex-col items-center justify-center">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        Eligibility Requirements
                                    </h3>
                                    <ul className="space-y-2">
                                        {scholarship.eligibility?.map((req, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Required Documents */}
                                <div className="space-y-3 flex flex-col items-center justify-center">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-primary" />
                                        Required Documents
                                    </h3>
                                    <ul className="space-y-2">
                                        {scholarship.documentsRequired?.map((doc, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-medium">
                                                    {index + 1}
                                                </div>
                                                <span className="text-sm">{doc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Tags and Metadata */}
                            <div className="space-y-4">
                                <div className="px-5">
                                    <h3 className="font-semibold mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {scholarship.tags?.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <h3 className="col-span-4 px-5 font-semibold">Tags</h3>
                                    <div className="flex flex-col items-center">
                                        <p className="text-muted-foreground">Created By</p>
                                        <p className="font-medium">Bora</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-muted-foreground">Created At</p>
                                        <p className="font-medium">10/12/2025</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-muted-foreground">Last Updated</p>
                                        <p className="font-medium">{formatDate(scholarship.lastUpdated)}</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-muted-foreground">Website</p>
                                        <a
                                            href={scholarship.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-primary hover:underline flex items-center gap-1"
                                        >
                                            Visit <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="applications">
                    <Card className="rounded shadow-none">
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Recent Applications</h2>
                            <p className="text-sm text-muted-foreground">
                                Total: {scholarship.applicants} applications
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Applicant</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Applied Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Sample data - replace with actual data */}
                                    <TableRow>
                                        <TableCell>#APP001</TableCell>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                                Under Review
                                            </Badge>
                                        </TableCell>
                                        <TableCell>2024-01-15</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics">
                    <Card className="rounded shadow-none">
                        <CardHeader>
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Scholarship Analytics
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Performance Metrics</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Views</span>
                                            <span className="font-medium">17</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Save Rate</span>
                                            <span className="font-medium">
                                                10%
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Application Rate</span>
                                            <span className="font-medium">
                                                20%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Timeline</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Created</span>
                                            <span className="font-medium">
                                                10/29/2024
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Time until deadline</span>
                                            <span className="font-medium">{daysUntilDeadline} days</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Last updated</span>
                                            <span className="font-medium">
                                                {formatDistanceToNow(new Date(scholarship.lastUpdated), { addSuffix: true })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Modal
                title="Confirm Delete"
                open={deleteModalOpen}
                onOk={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
                okText="Delete"
                okType="danger"
                cancelText="Cancel"
            >
                <Alert
                    title="Warning"
                    description="Are you sure you want to delete this scholarship? This action cannot be undone."
                    type="warning"
                    showIcon
                />
            </Modal>
        </div>
    );
}
