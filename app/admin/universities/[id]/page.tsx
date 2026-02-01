"use client";

import React, { use } from "react";
import UniversityDetails from "@/app/components/admin/universities/UniversityDetails";

// Mock data fetcher
const MOCK_UNIVERSITIES = [
    {
        id: "1",
        name: "Royal University of Phnom Penh",
        slug: "rupp",
        logo_url: "http://rupp.edu.kh/images/rupp-logo.png",
        cover_image_url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000",
        country: "Cambodia",
        city: "Phnom Penh",
        status: "active",
        tuition_rank: 1,
        official_website: "http://www.rupp.edu.kh",
        short_description: "The leading public university in Cambodia, committed to excellence in research and teaching.",
        description: "Established in 1960, the Royal University of Phnom Penh (RUPP) is the oldest and largest public university in Cambodia. It hosts over 20,000 students across various undergraduate and postgraduate programs. RUPP has played a critical role in the development of Cambodia's intellectual and professional human resources.",
        created_at: "2024-01-01",
    },
    {
        id: "2",
        name: "Zaman University",
        slug: "zaman",
        logo_url: "https://www.paragoniu.edu.kh/wp-content/uploads/2022/01/paragon-logo-2@2x.png",
        cover_image_url: "https://images.unsplash.com/photo-152305085306e-880009ce41c5?auto=format&fit=crop&q=80&w=1000",
        country: "Cambodia",
        city: "Phnom Penh",
        status: "active",
        tuition_rank: 2,
        official_website: "https://paragoniu.edu.kh",
        short_description: "International standard education in the heart of Cambodia.",
        description: "Paragon International University (formerly known as Zaman University) is a private university located in Phnom Penh. It offers high-quality higher education with an emphasis on research and community service, utilizing English as the primary medium of instruction.",
        created_at: "2024-01-05",
    },
];

export default function UniversityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
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
            <UniversityDetails university={university} />
        </div>
    );
}

