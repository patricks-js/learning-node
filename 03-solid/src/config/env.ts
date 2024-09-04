import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number(),
  HASH_SALT: z.coerce.number().positive().min(4).max(10),
});

export const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "Invalid environment variables:",
    _env.error.flatten().fieldErrors,
  );

  throw new Error("❌ Invalid environment variables");
}

export const env = _env.data;
