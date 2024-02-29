import { ENVIRONMENT } from "@blog/environment";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { match } from "ts-pattern";

import { entries } from "#src/schema.ts";

const PROXY_URL = new URL(`${ENVIRONMENT.SQLITE_PROXY_URL}/query`);

const queryFromDatabaseProxy = async (request: Request) => {
	try {
		const response = await fetch(request);

		if (!response.ok) {
			const message = await response.text();

			throw new Error(`Query proxy fetch encountered an error: "${message}"`);
		}

		const rows = (await response.json()) as Array<unknown>;

		return { rows };
	} catch (error) {
		if (error instanceof Error) throw error;

		throw new Error("Query proxy fetch encountered an unhandled error", { cause: error });
	}
};

const readDatabase = drizzle(
	async (sql, parameters, method) => {
		const searchParameters = new URLSearchParams();

		searchParameters.append("sql", sql);
		searchParameters.append("parameters", JSON.stringify(parameters));
		searchParameters.append("method", method);

		const urlWithParameters = new URL(`${PROXY_URL.toString()}?${searchParameters.toString()}`);

		return await queryFromDatabaseProxy(
			new Request(urlWithParameters, {
				cache: "no-store",
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
				cache: "no-store",
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
