import { ENVIRONMENT } from "@blog/environment";
import { migrate } from "drizzle-orm/sqlite-proxy/migrator";

import { database } from "#src/database.ts";

await migrate(
	database("write"),
	async queries => {
		await fetch(`${ENVIRONMENT.SQLITE_PROXY_URL}/migrate`, {
			body: JSON.stringify(queries),
			method: "POST",
		});
	},
	{ migrationsFolder: "./drizzle" },
);
