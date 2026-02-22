"use client";

import CreateTaskHeader from "@/app/components/admin/programs/CreateTaskHeader";
import CreateFacultyPage from "@/app/components/admin/faculties/FormCreateFaculty";

export default function CreateScholarship() {
  return (
    <div className="min-h-[90vh] divide-y p-4 gap-4 flex flex-col bg-white">
      <CreateTaskHeader />
      <CreateFacultyPage />
    </div>
  );
}
