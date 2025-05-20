import { z } from "zod";

export const imageUploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  isCommentable: z.enum(["true", "false"]),
  dominantColor: z.string().optional().nullable(),
  categories: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val ? JSON.parse(val) : [])),
});
