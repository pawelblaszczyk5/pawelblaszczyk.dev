import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entries = sqliteTable("entries", {
	id: text("id").primaryKey(),
	text: text("text").notNull(),
});
