import { app } from "./config/app";
import { env } from "./config/env";

const port = env.PORT;
const host = "0.0.0.0";

app
  .listen({
    port,
    host,
  })
  .then(() => {
    console.log(
      `🚀 HTTP server running. Docs available at http://${host}:${port}/docs`,
    );
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
