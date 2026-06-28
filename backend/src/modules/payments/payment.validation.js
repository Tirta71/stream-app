import { z } from "zod";

const createPaymentSchema = z.object({
  body: z.object({
    orderId: z.coerce.bigint(),
    paymentGateway: z.string().optional().nullable(),
    paymentMethod: z.string().min(1),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const paymentParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
  query: z.object({}).passthrough(),
});

const syncOrderPaymentSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    orderId: z.coerce.bigint(),
  }),
  query: z.object({}).passthrough(),
});

export { createPaymentSchema, paymentParamSchema, syncOrderPaymentSchema };
