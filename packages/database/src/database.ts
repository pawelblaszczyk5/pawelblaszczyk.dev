import { drizzle } from "drizzle-orm/sqlite-proxy";
import { match } from "ts-pattern";

import { CONFIG } from "@pawelblaszczyk.dev/config/website";

import { entries } from "#src/schema.ts";

const QUERY_PROXY_URL = new URL(`${CONFIG.SQLITE_PROXY_URL}/query`);
const BATCH_PROXY_URL = new URL(`${CONFIG.SQLITE_PROXY_URL}/batch`);

const fetchFromDatabaseProxy = async (request: Request) => {
	try {
		const response = await fetch(request);

		if (!response.ok) {
			const message = await response.text();

			throw new Error(`Query proxy fetch encountered an error: "${message}"`);
		}

		return response.json();
	} catch (error) {
		if (error instanceof Error) throw error;

		throw new Error("Query proxy fetch encountered an unhandled error", { cause: error });
	}
};

const WRITE_OPERATIONS_KEYWORDS = ["insert", "update", "delete", "create", "alter", "drop"] as const;

const TRANSACTION_RELATED_KEYWORDS = ["commit", "begin", "rollback", "savepoint", "release"] as const;

const getAccessTypeFromSql = (sql: string) =>
	WRITE_OPERATIONS_KEYWORDS.some(keyword => sql.includes(keyword)) ? "write" : "read";

const isQueryTransactional = (sql: string) => TRANSACTION_RELATED_KEYWORDS.some(keyword => sql.includes(keyword));

type CreateQueryRequestFunction = (
	sql: string,
	parameters: Array<unknown>,
	method: "all" | "get" | "run" | "values",
) => Request;

const createReadRequest = ((sql, parameters, method) => {
	const readRequestUrl = new URL(QUERY_PROXY_URL);

	readRequestUrl.searchParams.append("sql", sql);
	readRequestUrl.searchParams.append("parameters", JSON.stringify(parameters));
	readRequestUrl.searchParams.append("method", method);

	return new Request(readRequestUrl, {
		method: "GET",
	});
}) satisfies CreateQueryRequestFunction;

const createWriteRequest = ((sql, parameters, method) =>
	new Request(QUERY_PROXY_URL, {
		body: JSON.stringify({ method, parameters, sql }),
		method: "POST",
	})) satisfies CreateQueryRequestFunction;

export const database = drizzle(
	async (sql, parameters, method) => {
		// TODO: this may be a dumb idea, but I want to try it, infer automatically whether the database access should be write or read
		if (isQueryTransactional(sql)) throw new Error("Transactions should be performed via batch API");

		const request = match(getAccessTypeFromSql(sql))
			.with("read", () => createReadRequest(sql, parameters, method))
			.with("write", () => createWriteRequest(sql, parameters, method))
			.exhaustive();

		const data = (await fetchFromDatabaseProxy(request)) as { rows: Array<unknown> };

		return data;
	},
	async queries => {
		const mappedQueries = queries.map(query => ({ ...query, parameters: query.params }));
		const request = new Request(BATCH_PROXY_URL, {
			body: JSON.stringify(mappedQueries),
			method: "POST",
		});

		const data = (await fetchFromDatabaseProxy(request)) as Array<{ rows: Array<unknown> }>;

		return data;
	},
	{ schema: { entries } },
);
