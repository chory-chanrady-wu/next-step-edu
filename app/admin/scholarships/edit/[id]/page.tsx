import { EditScholarshipCn } from "@/app/components/admin/scholarships/EditScholarshipCn";
import { useScholarship } from "@/hooks/admin-custom-hook";
import dynamic from "next/dynamic";

// const FormEditScholarship = dynamic(
//     () =>
//         import("@/app/components/admin/scholarships/FormEditScholarship").then(
//             (mod) => mod.FormEditScholarship
//         ),
//     { ssr: false }
// );

interface Props {
    params: Promise<{id: string}>;
};

export default async function EditScholarshipPage({ params }: Props) {
    const {id} = await params;
    return (
        <div className="min-h-[90vh] divide-y p-4 gap-4 flex flex-col">
            <EditScholarshipCn id={id}/>
        </div>
    );
}
