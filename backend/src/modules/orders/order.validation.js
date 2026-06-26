import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    packageId: z.coerce.bigint(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const orderParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
  query: z.object({}).passthrough(),
});

export { createOrderSchema, orderParamSchema };
