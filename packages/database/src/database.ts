import { drizzle } from "drizzle-orm/sqlite-proxy";
import { match } from "ts-pattern";

import { CONFIG } from "@blog/config/site";

import { entries } from "#src/schema.ts";

const PROXY_URL = new URL(`${CONFIG.SQLITE_PROXY_URL}/query`);

const queryFromDatabaseProxy = async (request: Request) => {
	try {
		const response = await fetch(request);

		if (!response.ok) {
			const message = await response.text();

			throw new Error(`Query proxy fetch encountered an error: "${message}"`);
		}

		const rows = await response.json();

		return { rows } as { rows: Array<unknown> };
	} catch (error) {
		if (error instanceof Error) throw error;

		throw new Error("Query proxy fetch encountered an unhandled error", { cause: error });
	}
};

const WRITE_OPERATIONS_KEYWORDS = ["insert", "update", "delete", "create", "alter", "drop"] as const;

const readDatabase = drizzle(
	async (sql, parameters, method) => {
		// TODO: This may be too restrictive, observe it in the future
		if (WRITE_OPERATIONS_KEYWORDS.some(keyword => sql.includes(keyword)))
			throw new Error(
				"This query consists write operation keyword, database instance with write access should be used",
			);

		const searchParameters = new URLSearchParams();

		searchParameters.append("sql", sql);
		searchParameters.append("parameters", JSON.stringify(parameters));
		searchParameters.append("method", method);

		const urlWithParameters = new URL(`${PROXY_URL.toString()}?${searchParameters.toString()}`);

		return await queryFromDatabaseProxy(
			new Request(urlWithParameters, {
				method: "GET",
			}),
		);
	},
	{
		schema: { entries },
	},
);

const writeDatabase = drizzle(
	async (sql, parameters, method) =>
		await queryFromDatabaseProxy(
			new Request(PROXY_URL, {
				body: JSON.stringify({ method, parameters, sql }),
				method: "POST",
			}),
		),
	{
		schema: { entries },
	},
);

export const database = (accessLevel: "read" | "write") =>
	match(accessLevel)
		.with("read", () => readDatabase)
		.with("write", () => writeDatabase)
		.exhaustive();
