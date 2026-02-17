import { notFound } from "next/navigation";

import ScholarshipDetail from "@/app/client/components/scholarship/ScholarshipDetail";
import { getScholarshipById } from "@/app/client/scholarship/data";

export default async function ScholarshipDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const scholarship = await getScholarshipById(id);

  if (!scholarship) {
    notFound();
  }

  return <ScholarshipDetail scholarship={scholarship} />;
}
