import { z } from "zod";

const contentTypeSchema = z.enum(["movie", "series", "MOVIE", "SERIES"]);

const listContentSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
  query: z.object({
    genre: z.string().optional(),
    isPremium: z.coerce.boolean().optional(),
    isTopTen: z.coerce.boolean().optional(),
    isTrending: z.coerce.boolean().optional(),
    page: z.coerce.number().int().positive().default(1),
    search: z.string().optional(),
    take: z.coerce.number().int().positive().max(50).default(20),
    type: contentTypeSchema.optional(),
  }),
});

const idParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
  query: z.object({}).passthrough(),
});

const createContentSchema = z.object({
  body: z.object({
    ageRating: z.string().min(1),
    badge: z.string().optional().nullable(),
    description: z.string().min(1),
    image: z.string().url(),
    isActive: z.boolean().optional(),
    isPremium: z.boolean().optional(),
    isTopTen: z.boolean().optional(),
    isTrending: z.boolean().optional(),
    previewImage: z.string().url(),
    publishedAt: z.coerce.date().optional(),
    rating: z.coerce.number().min(0).max(5),
    releaseYear: z.coerce.number().int().optional().nullable(),
    slug: z.string().min(1),
    title: z.string().min(1),
    trailerUrl: z.string().url().optional().nullable(),
    type: contentTypeSchema,
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const updateContentSchema = createContentSchema.extend({
  body: createContentSchema.shape.body.partial(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
});

export {
  createContentSchema,
  idParamSchema,
  listContentSchema,
  updateContentSchema,
};
