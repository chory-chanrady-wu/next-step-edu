import { z } from "zod";

export const FacultySchema = z.object({
  id: z.string().uuid(),
  university_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1)
});

export type FacultySchemaType = z.infer<typeof FacultySchema>;
