import { $ } from "zx";

import { CONFIG } from "@pawelblaszczyk.dev/config/scripts";

import { getWebsiteAppName, setupCwd } from "#src/utils.ts";

setupCwd();

const WEBSITE_APP_NAME = getWebsiteAppName();

await $`cp apps/website/fly.toml .`;
await $`flyctl launch --name=${WEBSITE_APP_NAME} --copy-config --no-deploy --yes`;
await $`flyctl secrets set SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()}`;
await $`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --build-secret SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()} --yes`;
