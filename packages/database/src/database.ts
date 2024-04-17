import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";

import { CONFIG } from "@pawelblaszczyk.dev/config/website";

const client = createClient(
	typeof CONFIG.TURSO_DATABASE_TOKEN === "string" && typeof CONFIG.TURSO_DATABASE_URL === "string"
		? {
				authToken: CONFIG.TURSO_DATABASE_TOKEN,
				syncUrl: CONFIG.TURSO_DATABASE_URL,
				url: "file:replica.db",
			}
		: {
				url: "http://127.0.0.1:8080",
			},
);

export const database = drizzle(client);
