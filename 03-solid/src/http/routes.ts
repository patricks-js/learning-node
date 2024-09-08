import type { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate.controller";
import { register } from "./controllers/register.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users/register", register);
  app.post("/users/authenticate", authenticate);
}
