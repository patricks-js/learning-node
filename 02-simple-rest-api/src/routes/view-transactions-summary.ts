import { db } from "@/db";
import { checkSessionIdExists } from "@/middlewares/check-session-id-exists";
import type { FastifyInstance } from "fastify";

export async function viewTransactionsSummary(app: FastifyInstance) {
	app.get(
		"/summary",
		{ preHandler: [checkSessionIdExists] },
		async (request) => {
			const sessionId = request.cookies.sessionId;

			const summary = await db("tb_transactions")
				.where({ session_id: sessionId })
				.sum("amount", {
					as: "amount",
				})
				.first();

			return { summary };
		},
	);
}
