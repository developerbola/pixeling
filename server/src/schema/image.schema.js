const { z } = require("zod");

export const imageUploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  isCommentable: z.enum(["true", "false"]),
  categories: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val ? JSON.parse(val) : [])),

  height: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : null))
    .nullable(),

  width: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : null))
    .nullable(),
});
