export type Scholarship = {
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
  deadline: string;
  applicants: number;
  maxApplicants?: number;
  eligibility: string[];
  awardType: "full" | "partial" | "tuition" | "stipend";
  educationLevel: "undergraduate" | "graduate" | "phd" | "high-school" | "all";
  renewable: boolean;
  website: string;
  featured: boolean;
  rating: number;
  lastUpdated: string;
  tags: string[];
  applicationFee: boolean;
  documentsRequired: string[];
  location: string;
  international: boolean;
};
