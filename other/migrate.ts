import SqliteDatabase from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

if (!process.env["DATABASE_PATH"]) throw new Error('Environment variable "DATABASE_PATH" unset, can\'t run migrations');

const sqlite = new SqliteDatabase(process.env["DATABASE_PATH"]);

const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "./drizzle" });
