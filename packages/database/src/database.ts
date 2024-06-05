import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

import { CONFIG } from "@pawelblaszczyk.dev/config/website";

const client = createClient({
	url: CONFIG.TURSO_URL,
	...(CONFIG.TURSO_AUTH_TOKEN && { authToken: CONFIG.TURSO_AUTH_TOKEN }),
	...(CONFIG.TURSO_SYNC_URL && { syncUrl: CONFIG.TURSO_SYNC_URL }),
	fetch,
});

const database = drizzle(client);

if (CONFIG.TURSO_SYNC_URL) await client.sync();

await migrate(database, {
	migrationsFolder: "node_modules/@pawelblaszczyk.dev/database/drizzle/",
});

export { database };
