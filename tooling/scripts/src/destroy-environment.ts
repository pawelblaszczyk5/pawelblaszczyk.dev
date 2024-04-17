import { $ } from "zx";

import "@pawelblaszczyk.dev/config/scripts";

import { getSqliteProxyAppName, getWebsiteAppName, setupCwd } from "#src/utils.ts";

setupCwd();

await $`flyctl apps destroy ${getWebsiteAppName()} --yes`;
await $`flyctl apps destroy ${getSqliteProxyAppName()} --yes`;
