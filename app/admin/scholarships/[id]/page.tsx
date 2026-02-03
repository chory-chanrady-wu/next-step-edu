import { ScholarshipDetailAdmin } from "@/app/components/admin/scholarships/ScholarshipDetailsComponent";

const mockScholarship = {
  id: "scholarship-123",
  name: "STEM Excellence Scholarship",
  provider: "Tech University",
  providerLogo: "/images/university-logo.png",
  amount: 25000,
  currency: "USD",
  status: "open" as const,
  category: "stem",
  deadline: "2024-12-31",
  applicants: 245,
  maxApplicants: 500,
  eligibility: [
    "Minimum GPA of 3.5",
    "Enrolled in STEM program",
    "Undergraduate students only",
    "Demonstrated financial need",
  ],
  awardType: "partial" as const,
  educationLevel: "undergraduate",
  renewable: true,
  website: "https://example.com/apply",
  featured: true,
  rating: 4.5,
  lastUpdated: "2024-01-20",
  tags: ["STEM", "Merit-Based", "International"],
  applicationFee: false,
  documentsRequired: [
    "Academic transcripts",
    "Letter of recommendation",
    "Personal statement",
    "Proof of enrollment",
  ],
  location: "United States",
  international: true,
  createdBy: "Admin User",
  createdAt: "2024-01-01",
  views: 1200,
  saves: 85,
  applications: 245,
  shortlisted: 50,
  awarded: 10,
};

type ChildProps = {
  params: Promise<{id: string}>
}

export default async function ScholarshipDetailsPage( {params} : ChildProps) {
    const {id} = await params;
  return (
        <div className="p-6">
            <ScholarshipDetailAdmin id={id} />
        </div>
    );
}
