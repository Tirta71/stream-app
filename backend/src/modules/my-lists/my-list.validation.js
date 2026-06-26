import { z } from "zod";

const myListSchema = z.object({
  body: z.object({
    seriesFilmId: z.coerce.bigint(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const myListParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    seriesFilmId: z.coerce.bigint(),
  }),
  query: z.object({}).passthrough(),
});

export { myListParamSchema, myListSchema };
