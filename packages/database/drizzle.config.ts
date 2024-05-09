import type { Config } from "drizzle-kit";

import { defineConfig } from "drizzle-kit";

// TODO[+effect] Effect should clean this up a lot 😄
const dbCredentials = {
	url: process.env["TURSO_URL"] ?? "file:../../apps/website/local/sqlite.db",
	...(process.env["TURSO_AUTH_TOKEN"] ? { authToken: process.env["TURSO_AUTH_TOKEN"] } : undefined),
} satisfies Extract<Config, { dialect: "sqlite"; driver: "turso" }>["dbCredentials"];

export default defineConfig({
	dbCredentials,
	dialect: "sqlite",
	driver: "turso",
	out: "./drizzle",
	schema: "./src/schema.ts",
});
