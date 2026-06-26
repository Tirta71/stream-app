import { z } from "zod";

const createGenreSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const updateGenreSchema = createGenreSchema.extend({
  body: createGenreSchema.shape.body.partial(),
  params: z.object({
    slug: z.string().min(1),
  }),
});

const slugParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    slug: z.string().min(1),
  }),
  query: z.object({}).passthrough(),
});

export { createGenreSchema, slugParamSchema, updateGenreSchema };
