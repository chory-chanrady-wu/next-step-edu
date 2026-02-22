// import FacultiesPage from '@/app/components/admin/faculties/CreateFaculties'
import TableListFaculty from "@/app/components/admin/faculties/FacultyListTable";
import React from "react";

const page = () => {
  return (
    <div className="border min-h-[90vh] border-gray-200/50 rounded-md p-4 gap-2 flex flex-col bg-white">
      {/* <FacultiesPage /> */}
      <TableListFaculty />
    </div>
  );
};
export default page;
