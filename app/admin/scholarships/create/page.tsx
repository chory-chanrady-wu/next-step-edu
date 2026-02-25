"use client";


import dynamic from "next/dynamic";
import CreateScholarshipHeader from "@/app/components/admin/scholarships/CreateScholarshipHeader";
import { useState, useEffect } from "react";
import { getRole } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Button from "@/app/components/common/Button";

const FormCreateScholarship = dynamic(
  () =>
    import("@/app/components/admin/scholarships/FormCreateScholarship").then(
      (mod) => mod.FormCreateScholarship,
    ),
  {
    ssr: false,
  },
);

export default function CreateScholarship() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUserRole(getRole());
  }, []);

  if (userRole?.toLowerCase() === "user") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 rounded-3xl bg-red-50 flex items-center justify-center mb-8 shadow-2xl shadow-red-200/50 rotate-3">
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 font-outfit mb-4 tracking-tight">
          Access Restricted
        </h2>
        <p className="text-gray-500 text-center max-w-md text-lg leading-relaxed">
          You don&apos;t have the required administrative permissions to {" "}
          <span className="text-red-600 font-semibold">create</span> scholarships. Please contact your system administrator if you believe this is an error.
        </p>
        <Button
          onClick={() => router.push("/admin/scholarships")}
          className="mt-10 h-12 px-8 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] divide-y p-4 gap-4 flex flex-col bg-white">
      <CreateScholarshipHeader />
      <FormCreateScholarship />
    </div>
  );
}
