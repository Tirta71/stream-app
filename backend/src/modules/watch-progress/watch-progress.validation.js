import { z } from "zod";

const upsertWatchProgressSchema = z.object({
  body: z.object({
    episodeMovieId: z.coerce.bigint().optional().nullable(),
    lastPositionSeconds: z.coerce.number().int().min(0),
    progressPercent: z.coerce.number().int().min(0).max(100),
    seriesFilmId: z.coerce.bigint(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export { upsertWatchProgressSchema };
