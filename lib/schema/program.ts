import { z } from "zod";

export const programCreateSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  // Use .default("") or .min(0) to ensure it's not "undefined" if your type requires a string
  description: z.string().default(""),
  degreeLevel: z.number().int().min(1, "Degree level is required"),
  examRequired: z.boolean().default(false),
  tuitionFeeAmount: z.number().nonnegative("Tuition fee cannot be negative"),
  currency: z.enum(["USD", "EUR", "GBP", "KHR"]).default("USD"),
  studyPeriodMonths: z.number().int().positive("Must be at least 1 month"),
  universityId: z.coerce.number().int().positive("University ID is required"),
  facultyId: z.coerce.number().int().positive("Faculty ID is required"),
});
export const programUpdateSchema = programCreateSchema.extend({
  id: z.number().int().positive("ID must be a positive integer"),
});

// Infer the type DIRECTLY from the schema
export type ProgramCreateRequest = z.infer<typeof programCreateSchema>;
export type ProgramUpdateRequest = z.infer<typeof programUpdateSchema>;
