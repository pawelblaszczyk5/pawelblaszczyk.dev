import { building } from "$app/environment";
import { env } from "$env/dynamic/private";
import SqliteDatabase from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

export const db = (building ? null : drizzle(new SqliteDatabase(env.DATABASE_PATH)))!;

