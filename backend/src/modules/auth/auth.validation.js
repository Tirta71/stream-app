import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(8),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const googleLoginSchema = z.object({
  body: z.object({
    accessToken: z.string().min(1),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

const verifyEmailSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
  query: z.object({
    token: z.string().min(1),
  }),
});

const resendVerificationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export {
  googleLoginSchema,
  loginSchema,
  registerSchema,
  resendVerificationSchema,
  verifyEmailSchema,
};
