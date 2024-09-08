import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = registerBody.parse(request.body);

  const registerUseCase = makeRegisterUseCase();

  const { user } = await registerUseCase.execute({
    name,
    email,
    password,
  });

  return reply.status(201).send({ userId: user.id });
}
