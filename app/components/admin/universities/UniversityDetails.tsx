"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Globe,
  Star,
  Calendar,
  ExternalLink,
  Edit,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Users,
  Building,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { UniversityResponse } from "@/types/nextstepedu";

interface UniversityDetailsProps {
  university: UniversityResponse;
}

const UniversityDetails = ({ university }: UniversityDetailsProps) => {
  if (!university) return null;

  return <UniversityDetailsContent university={university} />;
};

// Split into sub-component to use hooks cleanly if needed, or just inline.
import { useDeleteUniversity } from "@/hooks/use-queries-hook";

const UniversityDetailsContent = ({
  university,
}: {
  university: UniversityResponse;
}) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteUniversity, isPending: isDeleting } =
    useDeleteUniversity();

  const handleConfirmDelete = () => {
    if (!university.id) return;
    deleteUniversity(university.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        router.push("/admin/universities");
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete University"
        description={`Are you sure you want to permanently delete "${university.name}"? This action will remove all historical data and cannot be undone.`}
        isLoading={isDeleting}
      />

      {/* Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/admin/universities" className="group">
          <div className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition-colors">
            <div className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center bg-white group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            Back to Directory
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link href={`/admin/universities/${university.id}/edit`}>
            <Button
              variant="outline"
              className="rounded-xl h-10 gap-2 border-gray-200 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all"
            >
              <Edit className="w-4 h-4" />
              Edit University
            </Button>
          </Link>
          <Button
            variant="outline"
            className="rounded-xl h-10 gap-2 border-gray-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
            Delete Record
          </Button>
        </div>
      </div>

      {/* Hero Section Card */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
        {/* Cover Image Placeholder */}
        <div className="relative h-64 md:h-80 w-full bg-gradient-to-r from-blue-600 to-indigo-700">
          {university.coverImageUrl || university.coverImage ? (
            <Image
              src={(university.coverImageUrl || university.coverImage)!}
              alt="Cover"
              fill
              className="object-cover opacity-60 mix-blend-overlay"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
              <Building className="w-64 h-64 text-white" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Logo positioning */}
          <div className="absolute -bottom-10 left-8 h-32 w-32 rounded-3xl bg-white p-2 shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden">
            {university.logoUrl || university.logo ? (
              <Image
                src={(university.logoUrl || university.logo)!}
                alt={university.name}
                width={128}
                height={128}
                className="object-contain p-2"
                unoptimized
              />
            ) : (
              <Building2 className="w-12 h-12 text-gray-300" />
            )}
          </div>
        </div>

        <CardContent className="pt-16 pb-8 px-8 border-none">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 font-outfit leading-none">
                  {university.name}
                </h1>
                <Badge
                  className={cn(
                    "capitalize",
                    university.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600",
                  )}
                  variant="secondary"
                >
                  {university.status}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 font-medium font-outfit">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {university.city || "Unknown City"},{" "}
                  {university.country || "Unknown Country"}
                </div>
                {university.officialWebsite && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-500" />
                    <a
                      href={university.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 hover:underline flex items-center gap-1 transition-all"
                    >
                      {university.officialWebsite.replace(/^https?:\/\//, "")}{" "}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  Founded{" "}
                  {university.createdAt
                    ? new Date(university.createdAt).getFullYear()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: GraduationCap,
            label: "Total Scholarships",
            value: "24 Active",
            color: "blue",
          },
          {
            icon: BookOpen,
            label: "Degree Programs",
            value: "86 Majors",
            color: "purple",
          },
          {
            icon: Users,
            label: "Enrolled Students",
            value: "12.4k",
            color: "emerald",
          },
          { icon: Star, label: "Global Ranking", value: "#42", color: "amber" },
        ].map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-[0_4px_20px_rgb(0,0,0,0.02)] bg-white rounded-3xl"
          >
            <CardContent className="p-6 flex items-center gap-4 border-none">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner",
                  stat.color === "blue" && "bg-blue-50 text-blue-600",
                  stat.color === "purple" && "bg-purple-50 text-purple-600",
                  stat.color === "emerald" && "bg-emerald-50 text-emerald-600",
                  stat.color === "amber" && "bg-amber-50 text-amber-600",
                )}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                  {stat.label}
                </p>
                <p className="text-lg font-black text-gray-900 font-outfit leading-none">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-gray-50 bg-gray-50/20">
              <h2 className="text-xl font-bold text-gray-900 font-outfit">
                Institutional Overview
              </h2>
            </div>
            <CardContent className="p-8 space-y-6 border-none">
              {/* Keep the quote block even without short_description, maybe duplicate start of desc */}
              <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <p className="text-blue-900 font-semibold italic text-lg leading-relaxed">
                  &quot;
                  {university.description
                    ? university.description.slice(0, 150) +
                      (university.description.length > 150 ? "..." : "")
                    : "No description provided."}
                  &quot;
                </p>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600 leading-relaxed text-base font-medium whitespace-pre-wrap">
                  {university.description ||
                    "Detailed institution background and information is not yet available for this record."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/20">
              <h2 className="text-lg font-bold text-gray-900 font-outfit">
                Quick Facts
              </h2>
            </div>
            <CardContent className="p-6 space-y-4 border-none">
              {[
                {
                  label: "Founded",
                  value: university.createdAt
                    ? new Date(university.createdAt).getFullYear().toString()
                    : "N/A",
                },
                { label: "Type", value: "Public Research" }, // Hardcoded for now
                { label: "Campus Size", value: "240 Acres" }, // Hardcoded
                { label: "Faculty Count", value: "1,240" }, // Hardcoded
                { label: "State/Province", value: university.city || "N/A" },
              ].map((fact, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <span className="text-sm font-bold text-gray-400">
                    {fact.label}
                  </span>
                  <span className="text-sm font-black text-gray-900 font-outfit">
                    {fact.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetails;
