"use client";

import React from "react";
import ApplicantTable from "@/app/components/admin/applicants/ApplicantTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ApplicantsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 font-outfit">
                        Applicants
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Manage and review scholarship applications from students.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-[2rem] p-1 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                <ApplicantTable />
            </div>
        </div>
    );
}
