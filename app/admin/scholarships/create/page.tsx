import CreateScholarshipHeader from "@/app/components/admin/scholarships/CreateScholarshipHeader";
import { FormCreateScholarship } from "@/app/components/admin/scholarships/FormCreateScholarship";


export default function CreateScholarship() {
    return (
         <div className=" min-h-[90vh] divide-y  p-4 gap-4 flex flex-col bg-white">
            <CreateScholarshipHeader/>
            <FormCreateScholarship/>
        </div>
    );
}
