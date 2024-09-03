import cookie from "@fastify/cookie";
import fastify from "fastify";
import { requestLogger } from "./middlewares/request-logger";
import { createTransaction } from "./routes/create-transaction";
import { fetchTransaction } from "./routes/fetch-transaction";
import { fetchTransactions } from "./routes/fetch-transactions";
import { viewTransactionsSummary } from "./routes/view-transactions-summary";

const app = fastify();

app.register(cookie);

app.addHook("preHandler", requestLogger);

app.register(createTransaction, { prefix: "/transactions" });
app.register(fetchTransactions, { prefix: "/transactions" });
app.register(fetchTransaction, { prefix: "/transactions" });
app.register(viewTransactionsSummary, { prefix: "/transactions" });

export default app;
