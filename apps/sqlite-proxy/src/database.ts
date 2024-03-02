import SqliteDatabase from "better-sqlite3";

import { ENVIRONMENT } from "@blog/environment/sqlite-proxy";

export const database = new SqliteDatabase(ENVIRONMENT.DATABASE_URL);
