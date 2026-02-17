import UniversityTable from "@/app/components/admin/universities/UniversityTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function UniversitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 font-outfit ml-5">
            Universities
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-5">
            Manage and monitor all registered universities across the platform.
          </p>
        </div>
        <Link href="/admin/universities/create">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all hover:shadow-lg mr-5">
            <Plus className="w-4 h-4 mr-2" />
            Create University
          </Button>
        </Link>
      </div>

      <UniversityTable />
    </div>
  );
}
