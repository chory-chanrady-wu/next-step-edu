import { z } from "zod";

export const UniversitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  logo_url: z.string().url().optional().nullable(),
  cover_image_url: z.string().url().optional().nullable(),
  short_description: z.string().min(1),
  description: z.string().min(1),
  tuition_rank: z.number().int().min(1).max(10),
  country: z.string().min(1),
  region_code: z.string().min(1),
  city: z.string().min(1),
  official_website: z.string().url(),
  status: z.enum(["published", "draft", "archived"]),
  deleted_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

export type UniversitySchemaType = z.infer<typeof UniversitySchema>;
