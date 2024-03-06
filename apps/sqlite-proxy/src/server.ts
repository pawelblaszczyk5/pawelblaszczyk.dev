import { logger } from "hono/logger";
import { Hono } from "hono/tiny";
import { P, match } from "ts-pattern";
import * as v from "valibot";

import { database } from "#src/database.ts";

export const server = new Hono();

server.use(logger());

const querySchema = v.object({
	method: v.union([v.literal("all"), v.literal("get"), v.literal("run"), v.literal("values")]),
	parameters: v.array(v.unknown()),
	sql: v.string(),
});

const batchSchema = v.array(querySchema);

type Query = v.Output<typeof querySchema>;

const safeJsonParse = (value: string) => {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
};

// This is inspired by DrizzleORM integration tests for their sqlite-proxy layer https://github.com/drizzle-team/drizzle-orm/blob/main/integration-tests/tests/sqlite-proxy.test.ts
const resolveQuery = ({ method, parameters, sql }: Query) =>
	match(method)
		.with("run", () => ({ rows: database.prepare(sql).run(parameters) }))
		.with(P.union("all", "values"), () => ({ rows: database.prepare(sql).raw().all(parameters) }))
		.with("get", () => ({ rows: database.prepare(sql).raw().get(parameters) }))
		.exhaustive();

const resolveBatch = (queries: Array<Query>) => {
	database.exec("begin");

	try {
		const results = queries.map(query => resolveQuery(query));

		database.exec("commit");

		return results;
	} catch (error) {
		database.exec("rollback");

		throw error;
	}
};

server.on(["GET", "POST"], "/query", async context => {
	const maybeQuery = await match(context.req.method as "GET" | "POST")
		.with("GET", () => {
			const method = context.req.query("method");
			const parameters = safeJsonParse(context.req.query("parameters") ?? "");
			const sql = context.req.query("sql");

			return { method, parameters, sql };
		})
		.with("POST", async () => (await context.req.json()) as unknown)
		.exhaustive();

	const result = v.safeParse(querySchema, maybeQuery);

	if (!result.success) {
		// eslint-disable-next-line no-console -- logging parsing issues to retrieve it in logs later on if needed
		console.log(result.issues);

		return context.text("Couldn't parse query", 400);
	}

	return context.json(resolveQuery(result.output));
});

server.on("POST", "/batch", async context => {
	const maybeQueries = (await context.req.json()) as unknown;

	const result = v.safeParse(batchSchema, maybeQueries);

	if (!result.success) {
		// eslint-disable-next-line no-console -- logging parsing issues to retrieve it in logs later on if needed
		console.log(v.flatten(result.issues));

		return context.text("Couldn't parse batch", 400);
	}

	return context.json(resolveBatch(result.output));
});

server.onError((error, context) => {
	// eslint-disable-next-line no-console -- logging unhandled error to retrieve it in logs later on if needed
	console.log(error);

	return context.text("Unhandled server error", 500);
});
