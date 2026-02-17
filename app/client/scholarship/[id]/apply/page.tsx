import { notFound } from "next/navigation";

import ScholarshipApplication from "@/app/client/components/scholarship/ScholarshipApplicationForm";
import { getScholarshipById } from "@/app/client/scholarship/data";

export default async function ApplyPageWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const scholarship = await getScholarshipById(id);

  if (!scholarship) {
    notFound();
  }

  return <ScholarshipApplication scholarship={scholarship} />;
}
