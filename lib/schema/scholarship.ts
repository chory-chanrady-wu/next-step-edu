import { UploadFile } from "antd";
import { z } from "zod";

export const scholarshipSchemaValidate = z.object({
  name: z.string().min(1, "Scholarship name is required"),

  description: z.string().min(1, "Description is required"),

  // Use preprocess to convert string input to number
  level: z.preprocess((val) => Number(val),
    z.number().int("Level must be an integer").positive("Level must be greater than 0")
  ),

  benefits: z.string().min(1, "Benefits are required"),

  requirements: z.string().min(1, "Requirements are required"),

  howToApply: z.string().min(1, "How to apply is required"),

  applyLink: z.string().url("Invalid application link"),

  deadline: z.string().min(1, "Deadline is required"),

  programId: z.preprocess((val) => Number(val),
    z.number().int("Program must be an integer").positive("Program must be valid")
  ),

  universityId: z.preprocess((val) => Number(val),
    z.number().int("University must be an integer").positive("University must be valid")
  ),

  status: z.enum(["ACTIVE", "INACTIVE"]),

  logo: z
    .array(z.custom<UploadFile>())
    .min(1, "Logo is required")
    .max(1, "Only one logo is allowed"),

  coverImage: z
    .array(z.custom<UploadFile>())
    .min(1, "Cover image is required")
    .max(1, "Only one cover image is allowed"),
});

export type ScholarshipType = z.infer<typeof scholarshipSchemaValidate>;
