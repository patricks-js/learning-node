import { config } from "dotenv";
import { z } from "zod";

switch (process.env.NODE_ENV) {
	case "test":
		config({ path: ".env.test" });
		break;
	case "production":
		config({ path: ".env.production" });
		break;
	default:
		config({ path: ".env.development" });
		break;
}

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	DATABASE_URL: z.string(),
	PORT: z.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("⚠️ Invalid environment variables!", _env.error.format());
	process.exit(1);
}

export const env = _env.data;
