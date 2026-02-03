import { ListHeaderTopScolarshipsAction } from "@/app/components/admin/scholarships/ListHeaderScholarshipAction";
import { OverviewScholarship } from "@/app/components/admin/scholarships/OverviewScholarship";
import { TableListScholarship } from "@/app/components/admin/scholarships/TableListScholarship";

export default function ScholarshipPage() {
    return (
        <div className="border min-h-[90vh] border-gray-200/50 rounded-md p-4 gap-2 flex flex-col bg-white">
            <ListHeaderTopScolarshipsAction/>
            <OverviewScholarship/>
            <TableListScholarship/>
        </div>
    );
}
