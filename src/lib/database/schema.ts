import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entries = sqliteTable("entries", {
	id: text("id").primaryKey(),
	region: text("region").notNull(),
	text: text("text").notNull(),
	username: text("username").notNull(),
});
