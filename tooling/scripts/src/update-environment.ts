import { $ } from "zx";

import { CONFIG } from "@pawelblaszczyk.dev/config/scripts";

import { migrateDatabase } from "#src/migrate-database.ts";
import { tursoApi } from "#src/turso-api.ts";
import { DATABASE_NAME, WEBSITE_APP_NAME, setupCwd } from "#src/utils.ts";

setupCwd();

const database = await tursoApi.databases.get(DATABASE_NAME);

const { jwt: token } = await tursoApi.databases.createToken(DATABASE_NAME, {
	authorization: "full-access",
	expiration: "5m",
});

const syncUrl = `libsql://${database.hostname}`;
const replicaUrl = "file:replica.db";

await migrateDatabase(syncUrl, token);

await $`cp apps/website/fly.toml .`;
await $`flyctl deploy --app=${WEBSITE_APP_NAME} --remote-only --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --build-secret TURSO_AUTH_TOKEN=${token} --build-secret TURSO_SYNC_URL=${syncUrl} --build-secret TURSO_URL=${replicaUrl} --yes`;
