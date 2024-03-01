import { serve } from "@hono/node-server";
import SqliteDatabase from "better-sqlite3";
import { logger } from "hono/logger";
import { Hono } from "hono/tiny";
import { P, match } from "ts-pattern";
import * as v from "valibot";

const DATABASE_URL = process.env["DATABASE_URL"] ?? "./local/sqlite.db";
const PORT = 3_001;

const app = new Hono();

app.use(logger());

const database = new SqliteDatabase(DATABASE_URL);

const querySchema = v.object({
	method: v.union([v.literal("all"), v.literal("get"), v.literal("run"), v.literal("values")]),
	parameters: v.array(v.unknown()),
	sql: v.string(),
});

type Query = v.Output<typeof querySchema>;

const safeJsonParse = (value: string) => {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
};

const resolveQuery = ({ method, parameters, sql }: Query) =>
	match(method)
		.with("run", () => database.prepare(sql).run(parameters))
		.with(P.union("all", "values"), () => database.prepare(sql).raw().all(parameters))
		.with("get", () => database.prepare(sql).raw().get(parameters))
		.exhaustive();

app.on(["GET", "POST"], "/query", async context => {
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

const migrationsSchema = v.array(v.string());

const runMigrations = (queries: Array<string>) => {
	database.exec("BEGIN");

	try {
		queries.forEach(query => database.exec(query));
		database.exec("COMMIT");

		return true;
	} catch (error) {
		database.exec("ROLLBACK");
		// eslint-disable-next-line no-console -- logging migration issues to retrieve it in logs later on if needed
		console.log(error);

		return false;
	}
};

app.post("/migrate", async context => {
	const maybeMigrations = (await context.req.json()) as unknown;
	const result = v.safeParse(migrationsSchema, maybeMigrations);

	if (!result.success) {
		// eslint-disable-next-line no-console -- logging parsing issues to retrieve it in logs later on if needed
		console.log(result.issues);

		return context.json({ message: "Couldn't parse migrations" }, 400);
	}

	const isSuccess = runMigrations(result.output);

	if (!isSuccess) return context.text("Running migrations failed", 500);

	return context.text("Successfully run migrations");
});

app.onError((error, context) => {
	// eslint-disable-next-line no-console -- logging unhandled error to retrieve it in logs later on if needed
	console.log(error);

	return context.text("Unhandled server error", 500);
});

serve({
	fetch: app.fetch,
	port: PORT,
});
