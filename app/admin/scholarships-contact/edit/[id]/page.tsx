
import { FormEditScholarshipContact } from "@/app/components/admin/scholarship-contact/FormEditScholarshipContact";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditFacultyPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="min-h-[90vh] divide-y p-4 gap-4 flex flex-col">
      <FormEditScholarshipContact id={id} />
    </div>
  );
}
