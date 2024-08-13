import { env } from "@/env";
import knex, { type Knex } from "knex";

export const knexConfig: Knex.Config = {
	client: "better-sqlite3",
	connection: {
		filename: env.DATABASE_URL,
	},
	migrations: {
		extension: "ts",
		directory: "./src/db/migrations",
	},
	useNullAsDefault: true,
};

export const db = knex(knexConfig);
