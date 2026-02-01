"use client";

import React, { use } from "react";
import UniversityForm from "@/app/components/admin/universities/UniversityForm";

// Mock data fetcher - in real app, use a hook or server component fetch
const MOCK_UNIVERSITIES = [
    {
        id: "1",
        name: "Royal University of Phnom Penh",
        slug: "rupp",
        logo_url: "http://rupp.edu.kh/images/rupp-logo.png",
        country: "Cambodia",
        city: "Phnom Penh",
        status: "active",
        tuition_rank: 1,
        official_website: "http://www.rupp.edu.kh",
        short_description: "The leading public university in Cambodia.",
        description: "Established in 1960, RUPP is the oldest and largest public university in Cambodia.",
        created_at: "2024-01-01",
    },
    {
        id: "2",
        name: "Zaman University",
        slug: "zaman",
        logo_url: "https://www.paragoniu.edu.kh/wp-content/uploads/2022/01/paragon-logo-2@2x.png",
        country: "Cambodia",
        city: "Phnom Penh",
        status: "active",
        tuition_rank: 2,
        official_website: "https://paragoniu.edu.kh",
        short_description: "International standard education in Cambodia.",
        description: "Paragon International University (formerly Zaman) offers high-quality instruction in English.",
        created_at: "2024-01-05",
    },
];

export default function EditUniversityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const university = MOCK_UNIVERSITIES.find(u => u.id === id);

    if (!university) {
        return (
            <div className="p-12 text-center">
                <h1 className="text-2xl font-bold text-gray-900">University Not Found</h1>
                <p className="text-gray-500 mt-2">The university you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    return (
        <div className="py-2">
            <UniversityForm initialData={university} mode="edit" />
        </div>
    );
}
