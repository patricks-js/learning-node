import app from "./app";
import { env } from "./env";

const port = env.PORT;
const host = "0.0.0.0";

app
	.listen({ port, host })
	.then(() => {
		console.log("Server listening at http://localhost:3333");
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
