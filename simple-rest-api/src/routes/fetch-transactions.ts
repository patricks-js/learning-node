import { db } from "@/db";
import { checkSessionIdExists } from "@/middlewares/check-session-id-exists";
import type { FastifyInstance } from "fastify";

export async function fetchTransactions(app: FastifyInstance) {
	app.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
		const sessionId = request.cookies.sessionId;

		const transactions = await db("tb_transactions")
			.where({ session_id: sessionId })
			.select();

		return { total: transactions.length, transactions };
	});
}
