"use client";

import { FormCreateProgram } from "@/app/components/admin/programs/FormCreateProgram";
import CreateTaskHeader from "@/app/components/admin/programs/CreateTaskHeader";

export default function CreateScholarship() {
  return (
    <div className="min-h-[90vh] divide-y p-4 gap-4 flex flex-col bg-white">
      <CreateTaskHeader />
      <FormCreateProgram />
    </div>
  );
}
