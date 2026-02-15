import { ScholarshipDetailAdmin } from "@/app/components/admin/scholarships/ScholarshipDetailsComponent";

type ChildProps = {
  params: Promise<{ id: string }>;
};

export default async function ScholarshipDetailsPage({ params }: ChildProps) {
  const { id } = await params;
  return (
    <div className="p-6">
      <ScholarshipDetailAdmin id={id} />
    </div>
  );
}
