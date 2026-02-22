import { FormEditFaculty } from "@/app/components/admin/faculties/FormEditFaculty";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditFacultyPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="min-h-[90vh] divide-y p-4 gap-4 flex flex-col">
      <FormEditFaculty id={id} />
    </div>
  );
}
