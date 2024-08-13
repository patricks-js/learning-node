import { db } from "@/db";
import { checkSessionIdExists } from "@/middlewares/check-session-id-exists";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function fetchTransaction(app: FastifyInstance) {
	app.get(
		"/:id",
		{ preHandler: [checkSessionIdExists] },
		async (request, reply) => {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			});

			const { id } = paramsSchema.parse(request.params);
			const sessionId = request.cookies.sessionId;

			const transaction = await db("tb_transactions")
				.where({ transaction_id: id, session_id: sessionId })
				.first();

			if (!transaction) {
				return reply.status(404).send({ message: "Transaction not found" });
			}

			return { transaction };
		},
	);
}
