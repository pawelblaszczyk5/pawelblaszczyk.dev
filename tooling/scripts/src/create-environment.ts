import { $ } from "zx";

import { CONFIG } from "@blog/config/scripts";

import {
	PRIMARY_REGION,
	SECONDARY_REGIONS,
	cloneMachineAcrossSecondaryRegions,
	getCurrentAppMachineId,
	getRedisDatabaseName,
	getRedisDatabasePrivateUrl,
	getSqliteProxyAppName,
	getSqliteProxyInternalUrl,
	getWebsiteAppName,
	setupCwd,
} from "#src/utils.ts";

setupCwd();

await $`cp apps/sqlite-proxy/fly.toml .`;
await $`flyctl launch --name=${getSqliteProxyAppName()} --copy-config --no-deploy --yes`;
await $`flyctl ips allocate-v6 --private`;
await $`flyctl volumes create data --size 1 --region=${PRIMARY_REGION} --yes`;
await $`flyctl consul attach`;
await $`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --yes`;

await cloneMachineAcrossSecondaryRegions(await getCurrentAppMachineId());

const REDIS_DATABASE_NAME = getRedisDatabaseName();

await $`flyctl redis create --name=${REDIS_DATABASE_NAME} --enable-eviction --region=${PRIMARY_REGION} --replica-regions=${SECONDARY_REGIONS.join(",")}`;

const WEBSITE_APP_NAME = getWebsiteAppName();

await $`cp apps/website/fly.toml .`;
await $`flyctl launch --name=${WEBSITE_APP_NAME} --copy-config --no-deploy --yes`;
await $`flyctl secrets set REDIS_DATABASE_URL=${await getRedisDatabasePrivateUrl()} SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()}`;
await $`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --build-secret REDIS_DATABASE_URL=${await getRedisDatabasePrivateUrl()} --build-secret SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()} --yes`;

await cloneMachineAcrossSecondaryRegions(await getCurrentAppMachineId());
