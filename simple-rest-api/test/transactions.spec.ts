import { execSync } from "node:child_process";
import app from "@/app";
import request from "supertest";
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "vitest";

describe("Transactions Routes", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(() => {
		execSync("pnpm knex migrate:latest");
	});

	afterEach(() => {
		execSync("pnpm knex migrate:rollback --all");
	});

	it("should be able to create a new transaction", async () => {
		const response = await request(app.server).post("/transactions").send({
			title: "New transaction",
			amount: 5000,
			type: "credit",
		});

		expect(response.status).toEqual(201);
		expect(response.body).toEqual({
			message: "Transaction created successfully",
		});
	});

	it("should be able to fetch all transactions", async () => {
		const createTransactionResponse = await request(app.server)
			.post("/transactions")
			.send({
				title: "New transaction",
				amount: 5000,
				type: "credit",
			});

		const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

		const response = await request(app.server)
			.get("/transactions")
			.set("Cookie", cookies);

		expect(response.status).toEqual(200);
		expect(response.body.transactions).toEqual([
			expect.objectContaining({
				title: "New transaction",
				amount: 5000,
			}),
		]);
	});

	it("should be able to fetch a specific transaction", async () => {
		const createTransactionResponse = await request(app.server)
			.post("/transactions")
			.send({
				title: "New transaction",
				amount: 5000,
				type: "credit",
			});

		const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

		const listAllTransactionsResponse = await request(app.server)
			.get("/transactions")
			.set("Cookie", cookies);

		const transactionId =
			listAllTransactionsResponse.body.transactions[0].transaction_id;

		const response = await request(app.server)
			.get(`/transactions/${transactionId}`)
			.set("Cookie", cookies);

		expect(response.status).toEqual(200);
		expect(response.body.transaction).toEqual(
			expect.objectContaining({
				title: "New transaction",
				amount: 5000,
			}),
		);
	});

	it("should be able to view summary of transactions", async () => {
		const createTransactionResponse = await request(app.server)
			.post("/transactions")
			.send({
				title: "Credit transaction",
				amount: 5000,
				type: "credit",
			});

		const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

		await request(app.server)
			.post("/transactions")
			.set("Cookie", cookies)
			.send({
				title: "Debit transaction",
				amount: 2700,
				type: "debit",
			});

		const response = await request(app.server)
			.get("/transactions/summary")
			.set("Cookie", cookies);

		expect(response.status).toEqual(200);
		expect(response.body.summary).toEqual({
			amount: 2300,
		});
	});
});
