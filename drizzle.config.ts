import type { Config } from "drizzle-kit";

export default {
	dbCredentials: {
		url: "./local/data.db",
	},
	driver: "better-sqlite",
	out: "./drizzle",
	schema: "./lib/db.ts",
} satisfies Config;
