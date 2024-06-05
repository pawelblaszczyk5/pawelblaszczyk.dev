import { $ } from "zx";

import { CONFIG } from "@pawelblaszczyk.dev/config/scripts";

import { tursoApi } from "#src/turso-api.ts";
import {
	DATABASE_NAME,
	IS_PRODUCTION,
	PRODUCTION_DATABASE_NAME,
	WEBSITE_APP_NAME,
	setupCwdToRootWorkspace,
} from "#src/utils.ts";

setupCwdToRootWorkspace();

const database = await tursoApi.databases.create(
	DATABASE_NAME,
	IS_PRODUCTION
		? { group: "default", is_schema: false }
		: { group: "default", is_schema: false, seed: { name: PRODUCTION_DATABASE_NAME, type: "database" } },
);

const { jwt: token } = await tursoApi.databases.createToken(DATABASE_NAME);

const syncUrl = `libsql://${database.hostname}`;
const replicaUrl = "file:replica.db";

await $`cp apps/website/fly.toml .`;
await $`flyctl launch --name=${WEBSITE_APP_NAME} --copy-config --no-deploy --yes`;
await $`flyctl secrets set TURSO_AUTH_TOKEN=${token}`;
await $`flyctl secrets set TURSO_SYNC_URL=${syncUrl}`;
await $`flyctl secrets set TURSO_URL=${replicaUrl}`;
await $`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --build-secret TURSO_AUTH_TOKEN=${token} --build-secret TURSO_SYNC_URL=${syncUrl} --build-secret TURSO_URL=${replicaUrl} --yes`;
