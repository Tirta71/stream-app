import { z } from "zod";

const subscriptionParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
  query: z.object({}).passthrough(),
});

export { subscriptionParamSchema };
