import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import SqliteDatabase from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entries = sqliteTable("entries", {
	id: text("id").primaryKey(),
	region: text("region").notNull(),
	text: text("text").notNull(),
	username: text("username").notNull(),
});

let localDb: BetterSQLite3Database | undefined;

export const db = () => {
	localDb ??= drizzle(new SqliteDatabase(process.env["DATABASE_PATH"]!));

	return localDb;
};
