import { $ } from "zx";

import { CONFIG } from "@pawelblaszczyk.dev/config/scripts";

import {
	PRIMARY_REGION,
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

const WEBSITE_APP_NAME = getWebsiteAppName();

await $`cp apps/website/fly.toml .`;
await $`flyctl launch --name=${WEBSITE_APP_NAME} --copy-config --no-deploy --yes`;
await $`flyctl secrets set SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()}`;
await $`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --build-secret --build-secret SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()} --yes`;
