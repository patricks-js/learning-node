import { randomUUID } from "node:crypto";
import { db } from "@/db";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function createTransaction(app: FastifyInstance) {
	app.post("/", async (request, reply) => {
		const bodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(["credit", "debit"]),
		});

		const { title, amount, type } = bodySchema.parse(request.body);

		let sessionId = request.cookies.sessionId;

		if (!sessionId) {
			sessionId = randomUUID();
			reply.cookie("sessionId", sessionId, {
				path: "/",
				maxAge: 60 * 60 * 24 * 7, // * 7 days
			});
		}

		await db("tb_transactions").insert({
			transaction_id: randomUUID(),
			title,
			amount: type === "credit" ? amount : -amount,
			session_id: sessionId,
		});

		return reply
			.status(201)
			.send({ message: "Transaction created successfully" });
	});
}
