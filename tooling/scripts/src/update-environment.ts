import { $ } from "zx";

import { CONFIG } from "@pawelblaszczyk.dev/config/scripts";

import { getWebsiteAppName, setupCwd } from "#src/utils.ts";

setupCwd();

await $`cp apps/website/fly.toml .`;
await $`flyctl deploy --app=${getWebsiteAppName()} --remote-only --build-secret TURBO_TEAM=${CONFIG.TURBO_TEAM} --build-secret TURBO_TOKEN=${CONFIG.TURBO_TOKEN} --build-secret SQLITE_PROXY_URL=${getSqliteProxyInternalUrl()} --yes`;
