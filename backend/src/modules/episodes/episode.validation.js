import { z } from "zod";

const listEpisodeSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
  query: z.object({
    seriesFilmId: z.coerce.bigint().optional(),
  }),
});

const createEpisodeSchema = z.object({
  body: z.object({
    description: z.string().optional().nullable(),
    duration: z.string().min(1),
    episodeNumber: z.coerce.number().int().optional().nullable(),
    seasonNumber: z.coerce.number().int().optional().nullable(),
    seriesFilmId: z.coerce.bigint(),
    thumbnailUrl: z.string().url().optional().nullable(),
    title: z.string().min(1),
    videoUrl: z.string().url().optional().nullable(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const updateEpisodeSchema = createEpisodeSchema.extend({
  body: createEpisodeSchema.shape.body.partial(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
});

const episodeParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
  query: z.object({}).passthrough(),
});

export {
  createEpisodeSchema,
  episodeParamSchema,
  listEpisodeSchema,
  updateEpisodeSchema,
};
