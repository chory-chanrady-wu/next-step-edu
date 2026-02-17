import { notFound } from "next/navigation";
import Link from "next/link";

import ScholarshipDetail from "@/app/client/components/scholarship/ScholarshipDetail";
import { getScholarshipById } from "@/app/client/scholarship/data";

export default async function ScholarshipDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const scholarship = await getScholarshipById(id);

    if (!scholarship) {
      console.error(`[DEBUG] No scholarship returned for ID: ${id}`);
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
            <p className="text-slate-600 mb-4">
              Scholarship not found. The scholarship you are looking for could
              not be found or may have been removed.
            </p>
            <Link
              href="/client/scholarship"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Scholarships
            </Link>
          </div>
        </div>
      );
    }

    return <ScholarshipDetail scholarship={scholarship} />;
  } catch (error) {
    console.error(`[DEBUG] Error fetching scholarship (ID: ${id}):`, error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Error</h1>
          <p className="text-slate-600 mb-4">
            Unable to load the scholarship details. Please try again later.
          </p>
          <Link
            href="/client/scholarship"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Scholarships
          </Link>
        </div>
      </div>
    );
  }
}
