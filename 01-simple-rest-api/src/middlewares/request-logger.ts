import type { FastifyRequest } from "fastify";

export async function requestLogger(request: FastifyRequest) {
	console.log(`[${request.method}] ${request.url}`);
}
