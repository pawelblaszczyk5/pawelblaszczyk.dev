import { $ } from "zx";

import { ENVIRONMENT } from "@blog/environment/scripts";

import {
	getRedisDatabasePrivateUrl,
	getSiteAppName,
	getSqliteProxyAppName,
	getSqliteProxyInternalUrl,
	setupCwd,
} from "#src/utils.ts";

setupCwd();

await $`cp apps/sqlite-proxy/fly.toml .`;
await $`flyctl deploy --app=${getSqliteProxyAppName()} --remote-only --build-secret TURBO_TEAM=${ENVIRONMENT.TURBO_TEAM} --build-secret TURBO_TOKEN=${ENVIRONMENT.TURBO_TOKEN} --yes`;

await $`cp apps/site/fly.toml .`;
await $`flyctl deploy --app=${getSiteAppName()} --remote-only --build-secret TURBO_TEAM=${ENVIRONMENT.TURBO_TEAM} --build-secret TURBO_TOKEN=${ENVIRONMENT.TURBO_TOKEN} --build-secret REDIS_DATABASE_URL=${await getRedisDatabasePrivateUrl()} --build-secret SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()} --yes`;
