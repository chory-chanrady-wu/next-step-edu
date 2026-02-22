import { z } from "zod";

export const facultyCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  universityId: z.coerce.number().int().positive("University ID is required"),
});

export type FacultyCreateRequest = z.infer<typeof facultyCreateSchema>;
