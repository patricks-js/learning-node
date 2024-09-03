import { Knex } from "knex";

declare module "knex/types/tables" {
	export interface Tables {
		tb_transactions: {
			transaction_id: string;
			title: string;
			amount: number;
			created_at: string;
			session_id?: string;
		};
	}
}
