import { UserAlreadyExistsError } from "@/use-cases/errors";
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";

export async function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: error.flatten().fieldErrors,
      message: "Validation failed",
      statusCode: 400,
    });
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.conflict(error.message);
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: send error to sentry
  }

  return reply.internalServerError("Something went wrong");
}
