import fastify from "fastify";
import z from "zod";
import { prisma } from "./prisma";

export const app = fastify();

app.post("/users", async (request, reply) => {
  const registerBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = registerBody.parse(request.body);

  const { id } = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: password,
    },
    select: {
      id: true,
    },
  });

  return reply.status(201).send({ userId: id });
});
