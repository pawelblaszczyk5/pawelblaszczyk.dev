import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { building } from "$app/environment";
import { env } from "$env/dynamic/private";
import SqliteDatabase from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

let localDatabase: BetterSQLite3Database | undefined;

export const getDatabase = () => {
	if (building) throw new Error("Can't access database during a build");
	localDatabase ??= drizzle(new SqliteDatabase(env.DATABASE_PATH));

	return localDatabase;
};
