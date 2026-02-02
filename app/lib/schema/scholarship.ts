import { UploadFile } from "antd";
import { z } from "zod";

export const scholarshipSchema = z.object({
  id: z.string(),

  title: z.string().min(1, "Title is required"),

  provider: z.string().min(1, "Provider is required"),

  // Accept a single image file
  providerLogo: z.custom<UploadFile[]>((val) => Array.isArray(val), {
    message: "Provider Logo is required",
  }),
  coverImage: z.custom<UploadFile[]>((val) => Array.isArray(val), {
    message: "Cover Image is required",
  }),

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

  maxApplicants: z.number().int().positive().optional(),

  eligibility: z.array(z.string()),

  slug: z.array(z.string()),

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

  tags: z.array(z.string()),

  applicationFee: z.boolean(),

  documentsRequired: z.array(z.string()),

  location: z.string(),

  international: z.boolean(),
});

// Infer TypeScript type
export type ScholarshipTask = z.infer<typeof scholarshipSchema>;
