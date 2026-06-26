import { z } from "zod";

const packageSchema = z.object({
  body: z.object({
    durationDays: z.coerce.number().int().positive(),
    isActive: z.boolean().optional(),
    maxDevices: z.coerce.number().int().positive(),
    name: z.string().min(1),
    price: z.coerce.number().positive(),
    quality: z.string().min(1),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const updatePackageSchema = packageSchema.extend({
  body: packageSchema.shape.body.partial(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
});

const packageParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    id: z.coerce.bigint(),
  }),
  query: z.object({}).passthrough(),
});

export { packageParamSchema, packageSchema, updatePackageSchema };
