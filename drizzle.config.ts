import type { Config } from "drizzle-kit";

export default {
	dbCredentials: {
		url: "./local/data.db",
	},
	driver: "better-sqlite",
	out: "./other/drizzle",
	schema: "./lib/db.ts",
} satisfies Config;
