"use client";

import React, { use } from "react";
import UniversityForm from "@/app/components/admin/universities/UniversityForm";
import { useUniversityById } from "@/hooks/use-queries-hook";
import { Loader2 } from "lucide-react";

export default function EditUniversityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: university, isLoading, isError } = useUniversityById(id);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError || !university) {
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
