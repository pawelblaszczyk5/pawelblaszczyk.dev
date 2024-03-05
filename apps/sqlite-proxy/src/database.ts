import SqliteDatabase from "better-sqlite3";

import { CONFIG } from "@pawelblaszczyk.dev/config/sqlite-proxy";

export const database = new SqliteDatabase(CONFIG.DATABASE_URL);
