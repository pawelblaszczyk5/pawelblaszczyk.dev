import SqliteDatabase from "better-sqlite3";

import { CONFIG } from "@blog/config/sqlite-proxy";

export const database = new SqliteDatabase(CONFIG.DATABASE_URL);
