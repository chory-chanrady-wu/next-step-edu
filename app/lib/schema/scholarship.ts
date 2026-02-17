import { UploadFile } from "antd";
import { z } from "zod";

export const scholarshipSchema = z.object({
  id: z.string(),

  title: z.string().min(1, "Title is required"),

  provider: z.string().min(1, "Provider is required"),

  // Accept a single image file
  providerLogo: z
    .array(z.custom<UploadFile>())
    .min(1, "Provider Logo is required"),

  coverImage: z.array(z.custom<UploadFile>()).min(1, "Cover Image is required"),

  amount: z.number().nonnegative(),

  currency: z
    .string()
    .min(1, "Please select your currency.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific currency.",
    }),

  status: z.enum(["open", "closed", "upcoming", "extended"]),

  category: z.enum([
    "academic",
    "sports",
    "arts",
    "stem",
    "need-based",
    "merit",
    "minority",
    "community",
  ]),

  deadline: z.string(),

  applicants: z.number().int().nonnegative(),

  maxApplicants: z.number(),

  eligibility: z
    .array(z.string())
    .min(1, "Select at least one eligibility requirement"),

  slug: z.array(z.string()).min(1, "Select at least one slug requirement"),

  awardType: z.enum(["full", "partial", "tuition", "stipend"]),

  educationLevel: z.enum([
    "undergraduate",
    "graduate",
    "phd",
    "high-school",
    "all",
  ]),

  renewable: z.boolean(),

  program: z.string(),

  description: z.string(),

  website: z.string().url(),

  featured: z.boolean(),

  rating: z.number().min(0).max(5),

  lastUpdated: z.string(),

  tags: z.array(z.string()).min(1, "Select at least one tag requirement"),

  applicationFee: z.boolean(),

  documentsRequired: z
    .array(z.string())
    .min(1, "Select at least one document requirement"),

  location: z.string(),

  international: z.boolean(),
});

// Infer TypeScript type
export type ScholarshipTask = z.infer<typeof scholarshipSchema>;
