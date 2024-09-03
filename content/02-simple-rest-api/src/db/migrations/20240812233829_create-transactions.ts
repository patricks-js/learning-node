import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("tb_transactions", (table) => {
		table.uuid("transaction_id").primary();
		table.text("title").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("tb_transactions");
}
