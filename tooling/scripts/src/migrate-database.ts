import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

export const migrateDatabase = async (url: string, token: string) => {
	const client = createClient({
		authToken: token,
		url,
	});

	const database = drizzle(client);

	await migrate(database, { migrationsFolder: "drizzle" });

	client.close();
};
