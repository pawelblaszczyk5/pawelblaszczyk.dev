import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

import { assert } from "@pawelblaszczyk.dev/assert";
import { CONFIG } from "@pawelblaszczyk.dev/config/scripts";

const { TURSO_AUTH_TOKEN, TURSO_URL } = CONFIG;

assert(TURSO_AUTH_TOKEN);
assert(TURSO_URL);

const client = createClient({
	authToken: TURSO_AUTH_TOKEN,
	url: TURSO_URL,
});

export const database = drizzle(client);

await migrate(database, { migrationsFolder: "drizzle" });

client.close();
