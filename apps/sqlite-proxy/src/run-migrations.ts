import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { database } from "#src/database.ts";

export const runMigrations = () => {
	const drizzleDatabase = drizzle(database);

	migrate(drizzleDatabase, {
		migrationsFolder: "./drizzle",
	});
};
