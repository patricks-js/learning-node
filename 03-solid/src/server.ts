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
    console.log(`Server listening on http://${host}:${port}`);
  });
