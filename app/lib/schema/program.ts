import { z } from "zod";

export const ProgramSchema = z.object({
  id: z.string().uuid(),
  university_id: z.string().uuid(),
  faculty_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  degree_level: z.number().int(),
  exam_required: z.boolean(),
  tuition_fee_amount: z.number().nonnegative(),
  currency: z.string().length(3),  // ISO currency code
  study_period_months: z.number().int().positive()
});

export type ProgramSchemaType = z.infer<typeof ProgramSchema>;
