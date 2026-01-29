import { z } from "zod";

export const scholarshipSchema = z.object({
  name: z.string().min(1),

  provider: z.string(),
  providerLogo: z.string().url(),

  amount: z.number(),
  currency: z
    .string()
    .min(1, "Please select your currency.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific currency.",
    }),

  status: z.enum(["open", "closed", "upcoming"]),

  category: z.string(),

  deadline: z.string(), // or z.coerce.date()

  applicants: z.number().int().nonnegative(),
  maxApplicants: z.number().int().positive(),

  eligibility: z.array(z.string()),

  awardType: z.enum(["full", "partial"]),
  educationLevel: z.enum(["undergraduate", "graduate", "phd", "diploma"]),

  renewable: z.boolean(),

  website: z.string().url(),

  featured: z.boolean(),

  rating: z.number().min(0).max(5),

  lastUpdated: z.string(), // or z.coerce.date()

  tags: z.array(z.string()),

  applicationFee: z.boolean(),

  documentsRequired: z.array(z.string()),

  location: z.string(),

  international: z.boolean(),
});
export type ScholarshipTask = z.infer<typeof scholarshipSchema>;
