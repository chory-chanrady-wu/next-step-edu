import { z } from "zod";

export const scholarshipContactCreateSchema = z.object({
  scholarshipId: z.number().min(1, "Please select a scholarship"),

  label: z.string().min(1, "Contact name is required"),

  email: z.string().email("Invalid email address").optional().or(z.literal("")),

  phone: z.string().optional(),

  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),

});

export type ScholarshipContactCreateInput = z.infer<
  typeof scholarshipContactCreateSchema
>;
