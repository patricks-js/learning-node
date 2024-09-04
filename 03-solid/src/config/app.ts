import { appRoutes } from "@/http/routes";
import fastify from "fastify";
import { errorHandler } from "./error-handler";

export const app = fastify();

app.register(import("@fastify/sensible"));

app.register(appRoutes, { prefix: "/api" });

app.setErrorHandler(errorHandler);
