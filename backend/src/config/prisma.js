import { PrismaClient } from "@prisma/client";
import env from "./env.js";

const prisma = new PrismaClient({
  log: env.isProduction ? ["error"] : ["query", "error", "warn"],
});

export default prisma;
