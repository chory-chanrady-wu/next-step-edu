"use client";

import dynamic from "next/dynamic";
import CreateScholarshipHeader from "@/app/components/admin/scholarships/CreateScholarshipHeader";

const FormCreateScholarship = dynamic(
  () =>
    import("@/app/components/admin/scholarships/FormCreateScholarship").then(
      (mod) => mod.FormCreateScholarship,
    ),
  {
    ssr: false,
  },
);

export default function CreateScholarship() {
  return (
    <div className="min-h-[90vh] divide-y p-4 gap-4 flex flex-col bg-white">
      <CreateScholarshipHeader />
      <FormCreateScholarship />
    </div>
  );
}
