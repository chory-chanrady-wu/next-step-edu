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

interface ScholarshipData {
    id: string;
    name: string;
    provider: string;
    providerLogo: string;
    amount: number;
    currency: string;
    status: "open" | "closed" | "upcoming";
    category: string;
    deadline: string;
    applicants: number;
    maxApplicants: number;
    eligibility: string[];
    awardType: "full" | "partial" | "merit";
    educationLevel: string;
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
    createdBy: string;
    createdAt: string;
    views: number;
    saves: number;
    applications: number;
    shortlisted: number;
    awarded: number;
}

interface ScholarshipDetailProps {
    scholarship: ScholarshipData;
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
    return new Date(dateString).toLocaleDateString("en-US", {
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
    scholarship,
    onEdit,
    onDelete,
    onStatusChange,
    onExport,
}: ScholarshipDetailProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [exportModalOpen, setExportModalOpen] = useState(false);
    const applicantProgress = (scholarship.applicants / scholarship.maxApplicants) * 100;
    const daysUntilDeadline = Math.ceil(
        (new Date(scholarship.deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        onDelete?.(scholarship.id);
        setDeleteModalOpen(false);
    };

    const handleExport = () => {
        setExportModalOpen(true);
    };

    const confirmExport = () => {
        onExport?.(scholarship.id);
        setExportModalOpen(false);
    };

    const renderStats = () => (
        <div className="grid  gap-4 mb-6">
            <ScholarshipStats totalApplications={500}
                shortlisted={75}
                awarded={25}
                saved={120} />
        </div>
    );

    return (
        <div className="min-h-screen ">
            {/* Admin Actions Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        Scholarship Details
                    </h1>
                    <p className="text-muted-foreground">Manage and view scholarship details</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit?.(scholarship.id)}
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExport}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </Button>
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
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="applications">Applications</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Main Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center ">
                                <div className=" rounded-lg bg-card flex items-center justify-center overflow-hidden">
                                    <Avatar className="h-16 w-16 rounded-lg border">
                                        <AvatarImage
                                            src={scholarship.providerLogo}
                                            alt={scholarship.provider}
                                        />
                                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold">
                                            {scholarship.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex">
                                    <div className="  flex flex-col items-center justify-center">
                                        {scholarship.featured && (
                                            <Sparkles size={18} />
                                        )}
                                        <Tag  color={getStatusColor(scholarship.status)}>
                                            {scholarship.status.toUpperCase()}
                                        </Tag>
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-2xl font-bold text-foreground">
                                            {scholarship.name}
                                        </h4>
                                        <p className="text-muted-foreground">{scholarship.provider}</p>
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
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        Eligibility Requirements
                                    </h3>
                                    <ul className="space-y-2">
                                        {scholarship.eligibility.map((req, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Required Documents */}
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-primary" />
                                        Required Documents
                                    </h3>
                                    <ul className="space-y-2">
                                        {scholarship.documentsRequired.map((doc, index) => (
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
                                <div>
                                    <h3 className="font-semibold mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {scholarship.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Created By</p>
                                        <p className="font-medium">{scholarship.createdBy}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Created At</p>
                                        <p className="font-medium">{formatDate(scholarship.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Last Updated</p>
                                        <p className="font-medium">{formatDate(scholarship.lastUpdated)}</p>
                                    </div>
                                    <div>
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
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Recent Applications</h2>
                            <p className="text-sm text-muted-foreground">
                                Total: {scholarship.applications} applications
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
                    <Card>
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
                                            <span className="font-medium">{scholarship.views}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Save Rate</span>
                                            <span className="font-medium">
                                                {((scholarship.saves / scholarship.views) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Application Rate</span>
                                            <span className="font-medium">
                                                {((scholarship.applications / scholarship.views) * 100).toFixed(1)}%
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
                                                {formatDistanceToNow(new Date(scholarship.createdAt), { addSuffix: true })}
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

            {/* Export Modal */}

            <Modal
                title="Export Scholarship Data"
                open={exportModalOpen}
                onOk={confirmExport}
                onCancel={() => setExportModalOpen(false)}
                okText="Export"
                cancelText="Cancel"
            >
                <p>Select the data you want to export:</p>
                <div className="space-y-2 mt-4">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Scholarship Details
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Application Data
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Analytics Data
                    </label>
                </div>
            </Modal>
        </div>
    );
}
