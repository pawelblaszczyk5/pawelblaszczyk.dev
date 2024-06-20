import { defineConfig } from "drizzle-kit";

export default defineConfig({
	// NOTE this is only used for local push, migrations are handled via runtime migrator during application startup
	dbCredentials: {
		url: "file:../../apps/website/local/sqlite.db",
	},
	dialect: "sqlite",
	driver: "turso",
	out: "./drizzle",
	schema: "./src/schema.ts",
});
