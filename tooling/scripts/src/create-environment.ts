import { $ } from "zx";

import { ENVIRONMENT } from "@blog/environment/scripts";

import {
	PRIMARY_REGION,
	SECONDARY_REGIONS,
	cloneMachineAcrossSecondaryRegions,
	getCurrentAppMachineId,
	getRedisDatabaseName,
	getRedisDatabasePrivateUrl,
	getSiteAppName,
	getSqliteProxyAppName,
	getSqliteProxyInternalUrl,
	setupCwd,
} from "#src/utils.ts";

setupCwd();

await $`cp apps/sqlite-proxy/fly.toml .`;
await $`flyctl launch --name=${getSqliteProxyAppName()} --copy-config --no-deploy --yes`;
await $`flyctl ips allocate-v6 --private`;
await $`flyctl volumes create data --size 1 --region=${PRIMARY_REGION} --yes`;
await $`flyctl consul attach`;
await $`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${ENVIRONMENT.TURBO_TEAM} --build-secret TURBO_TOKEN=${ENVIRONMENT.TURBO_TOKEN} --yes`;

await cloneMachineAcrossSecondaryRegions(await getCurrentAppMachineId());

const REDIS_DATABASE_NAME = getRedisDatabaseName();

await $`flyctl redis create --name=${REDIS_DATABASE_NAME} --enable-eviction --region=${PRIMARY_REGION} --replica-regions=${SECONDARY_REGIONS.join(",")}`;

const SITE_APP_NAME = getSiteAppName();

await $`cp apps/site/fly.toml .`;
await $`flyctl launch --name=${SITE_APP_NAME} --copy-config --no-deploy --yes`;
await $`flyctl secrets set REDIS_DATABASE_URL=${await getRedisDatabasePrivateUrl()} SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()}`;
await $`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${ENVIRONMENT.TURBO_TEAM} --build-secret TURBO_TOKEN=${ENVIRONMENT.TURBO_TOKEN} --build-secret REDIS_DATABASE_URL=${await getRedisDatabasePrivateUrl()} --build-secret SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()} --yes`;

await cloneMachineAcrossSecondaryRegions(await getCurrentAppMachineId());
