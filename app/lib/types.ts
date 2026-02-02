export type ScholarshipType = {
  id: string;
  name: string;
  provider: string;
  providerLogo?: string;

  amount: number;
  currency: string;

  status: "open" | "closed" | "upcoming" | "extended";

  category:
    | "academic"
    | "sports"
    | "arts"
    | "stem"
    | "need-based"
    | "merit"
    | "minority"
    | "community";

  deadline: string; // YYYY-MM-DD

  applicants: number;
  maxApplicants?: number;

  eligibility: string[];

  awardType: "full" | "partial" | "tuition" | "stipend";

  educationLevel:
    | "undergraduate"
    | "graduate"
    | "phd"
    | "high-school"
    | "all";

  renewable: boolean;

  website: string;

  featured: boolean;

  rating: number; // 0 - 5

  lastUpdated: string; // YYYY-MM-DD

  tags: string[];

  applicationFee: boolean;

  documentsRequired: string[];

  location: string;

  international: boolean;
};
