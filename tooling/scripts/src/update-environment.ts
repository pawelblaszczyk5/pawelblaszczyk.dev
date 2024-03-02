import { $ } from "zx";

import { CONFIG } from "@blog/config/scripts";

import {
	getRedisDatabasePrivateUrl,
	getSiteAppName,
	getSqliteProxyAppName,
	getSqliteProxyInternalUrl,
	setupCwd,
} from "#src/utils.ts";

setupCwd();

await $`cp apps/sqlite-proxy/fly.toml .`;
await $`flyctl deploy --app=${getSqliteProxyAppName()} --remote-only --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --yes`;

await $`cp apps/site/fly.toml .`;
await $`flyctl deploy --app=${getSiteAppName()} --remote-only --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --build-secret REDIS_DATABASE_URL=${await getRedisDatabasePrivateUrl()} --build-secret SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()} --yes`;
