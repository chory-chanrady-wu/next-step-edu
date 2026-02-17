"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Edit,
  Loader2,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  DollarSign,
  FileText,
  Globe,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  useApplicant,
  useUpdateApplicantStatus,
} from "@/hooks/use-queries-hook";
import Link from "next/link";
import { toast } from "sonner";

export default function ApplicantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: applicant, isLoading, isError } = useApplicant(id);
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateApplicantStatus();

  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          icon: CheckCircle2,
          color: "text-green-500",
          bg: "bg-green-50",
          border: "border-green-100",
          label: "Approved",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-500",
          bg: "bg-red-50",
          border: "border-red-100",
          label: "Rejected",
        };
      default:
        return {
          icon: Clock,
          color: "text-amber-500",
          bg: "bg-amber-50",
          border: "border-amber-100",
          label: "Pending Review",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] w-full items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
        <p className="text-gray-500 font-bold font-outfit">
          Loading application details...
        </p>
      </div>
    );
  }

  if (isError || !applicant) {
    return (
      <div className="p-12 text-center max-w-md mx-auto mt-20">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 font-outfit">
          Application Not Found
        </h1>
        <Button
          onClick={() => router.push("/admin/applicants")}
          className="mt-6 bg-blue-600"
        >
          Back to Applicants
        </Button>
      </div>
    );
  }

  const status = getStatusConfig(applicant.status || "pending");
  const StatusIcon = status.icon;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="group">
            <div className="h-12 w-12 rounded-2xl border border-gray-200 flex items-center justify-center bg-white group-hover:border-blue-500 group-hover:bg-blue-50 transition-all shadow-sm">
              <ChevronLeft className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
            </div>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-outfit">
                {applicant.firstName} {applicant.lastName}
              </h1>
              <Badge
                className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                  status.bg,
                  status.color,
                )}
              >
                {status.label}
              </Badge>
            </div>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              ID:{" "}
              <span className="text-gray-900 font-bold">#{applicant.id}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              Applied:{" "}
              <span className="text-gray-900 font-bold">
                {applicant.createdAt
                  ? new Date(applicant.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/admin/applicants/${applicant.id}/edit`}>
            <Button
              variant="outline"
              className="h-11 rounded-xl px-5 border-gray-200 font-bold text-gray-600 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" /> Edit
            </Button>
          </Link>
          <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            <button
              disabled={isUpdating || applicant.status === "APPROVED"}
              onClick={() => {
                updateStatus(
                  { id: applicant.id, status: "APPROVED" },
                  {
                    onSuccess: () =>
                      toast.success("Applicant approved successfully"),
                    onError: (err: any) =>
                      toast.error(
                        err.response?.data?.message ||
                          "Failed to approve applicant",
                      ),
                  },
                );
              }}
              className={cn(
                "h-9 px-4 rounded-lg flex items-center gap-2 text-xs font-bold transition-all",
                applicant.status === "APPROVED"
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-50 text-green-600 disabled:opacity-50",
              )}
            >
              Approve
            </button>
            <button
              disabled={isUpdating || applicant.status === "REJECTED"}
              onClick={() => {
                updateStatus(
                  { id: applicant.id, status: "REJECTED" },
                  {
                    onSuccess: () =>
                      toast.success("Applicant rejected successfully"),
                    onError: (err: any) =>
                      toast.error(
                        err.response?.data?.message ||
                          "Failed to reject applicant",
                      ),
                  },
                );
              }}
              className={cn(
                "h-9 px-4 rounded-lg flex items-center gap-2 text-xs font-bold transition-all",
                applicant.status === "REJECTED"
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-50 text-red-600 disabled:opacity-50",
              )}
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Identity Details</h3>
            </div>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Full Name
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {applicant.firstName} {applicant.lastName}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Gender & Birth
                </p>
                <p className="text-sm font-bold text-gray-800 capitalize">
                  {applicant.gender.toLowerCase()},{" "}
                  {applicant.dateOfBirth
                    ? new Date(applicant.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Nationality
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {applicant.nationality}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-900">Contact Channels</h3>
            </div>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-50">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="space-y-1 overflow-hidden">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {applicant.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Phone
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {applicant.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-50">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Address
                  </p>
                  <p className="text-sm font-bold text-gray-800 leading-relaxed">
                    {applicant.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: academic, motivation */}
        <div className="lg:col-span-2 space-y-8">
          {/* Status Banner */}
          <div
            className={cn(
              "p-6 rounded-3xl border flex items-center justify-between gap-4",
              status.bg,
              status.border,
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "p-3 rounded-2xl bg-white shadow-sm",
                  status.color,
                )}
              >
                <StatusIcon className="w-6 h-6" />
              </div>
              <div>
                <h4
                  className={cn("font-bold text-lg font-outfit", status.color)}
                >
                  Application is {status.label}
                </h4>
                <p className="text-xs font-semibold opacity-70">
                  Updated on{" "}
                  {applicant.updatedAt
                    ? new Date(applicant.updatedAt).toLocaleTimeString()
                    : "N/A"}
                </p>
              </div>
            </div>
            {applicant.status === "PENDING" && (
              <p className="text-xs font-bold text-amber-700 bg-amber-200/50 px-3 py-1 rounded-full animate-pulse">
                Needs Review
              </p>
            )}
          </div>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-extrabold text-xl font-outfit text-gray-900">
                  Academic Background
                </h3>
              </div>
              <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  GPA Score:
                </span>
                <span className="text-lg font-black">
                  {applicant.gpa.toFixed(2)}
                </span>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" /> High School
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {applicant.highSchoolName}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5" /> Intended Major
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      {applicant.intendedMajor}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" /> Scholarship Level
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {applicant.scholarshipType}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5" /> Est. Monthly Income
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ${applicant.familyIncome.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <div className="p-8 border-b border-gray-50 bg-gray-50/30">
              <h3 className="font-extrabold text-xl font-outfit text-gray-900 flex items-center gap-3">
                <FileText className="w-6 h-6 text-amber-500" />
                Personal Statement
              </h3>
            </div>
            <CardContent className="p-8">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap italic font-medium">
                  &quot;{applicant.motivationLetter}&quot;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
