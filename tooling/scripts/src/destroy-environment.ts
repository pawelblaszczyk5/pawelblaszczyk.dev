import { $ } from "zx";

import "@blog/config/scripts";

import { getRedisDatabaseName, getSqliteProxyAppName, getWebsiteAppName, setupCwd } from "#src/utils.ts";

setupCwd();

await $`flyctl apps destroy ${getWebsiteAppName()} --yes`;
await $`flyctl apps destroy ${getSqliteProxyAppName()} --yes`;
await $`flyctl redis destroy ${getRedisDatabaseName()} --yes`;
