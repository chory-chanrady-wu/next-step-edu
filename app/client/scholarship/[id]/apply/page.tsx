import { notFound } from "next/navigation";

import ScholarshipApplicationForm from "@/app/client/components/scholarship/ScholarshipApplicationForm";
import { getScholarshipById } from "@/app/client/scholarship/data";

export default async function ScholarshipApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scholarship = getScholarshipById(id);

  if (!scholarship) notFound();

  return <ScholarshipApplicationForm scholarship={scholarship} />;
}

