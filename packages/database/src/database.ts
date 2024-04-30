import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { CONFIG } from "@pawelblaszczyk.dev/config/website";

const client = createClient({
	url: CONFIG.TURSO_URL,
	...(CONFIG.TURSO_AUTH_TOKEN && { authToken: CONFIG.TURSO_AUTH_TOKEN }),
	...(CONFIG.TURSO_SYNC_URL && { syncUrl: CONFIG.TURSO_SYNC_URL }),
	fetch,
});

if (CONFIG.TURSO_SYNC_URL) await client.sync();

export const database = drizzle(client);
