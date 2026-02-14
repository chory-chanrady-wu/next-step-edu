"use client";

import React, { use } from "react";
import UniversityForm from "@/app/components/admin/universities/UniversityForm";
import { useUniversityById } from "@/hooks/use-queries-hook";

export default function EditUniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: university, isLoading, error } = useUniversityById(id);

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <div className="text-lg text-gray-500">Loading university...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Error Loading University
        </h1>
        <p className="text-gray-500 mt-2">
          Failed to load university data. Please try again.
        </p>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          University Not Found
        </h1>
        <p className="text-gray-500 mt-2">
          The university you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="py-2">
      <UniversityForm initialData={university} mode="edit" />
    </div>
  );
}
