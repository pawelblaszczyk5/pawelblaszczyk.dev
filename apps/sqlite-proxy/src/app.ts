import { serve } from "@hono/node-server";
import { parseArgs } from "node:util";

import { runMigrations } from "#src/run-migrations.ts";
import { app } from "#src/server.ts";

const PORT = 3_001;

const {
	values: { type },
} = parseArgs({
	allowPositionals: false,
	options: {
		type: {
			short: "t",
			type: "string",
		},
	},
	strict: true,
});

if (type === "migrations") runMigrations();

if (type === "server") serve({ fetch: app.fetch, port: PORT });
