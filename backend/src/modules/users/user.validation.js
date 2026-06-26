import { z } from "zod";

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    password: z.string().min(8).optional(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export { updateProfileSchema };
