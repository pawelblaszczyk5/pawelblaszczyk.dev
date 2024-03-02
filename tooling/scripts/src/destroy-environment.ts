import { $ } from "zx";

import "@blog/environment/scripts";

import { getRedisDatabaseName, getSiteAppName, getSqliteProxyAppName, setupCwd } from "#src/utils.ts";

setupCwd();

await $`flyctl apps destroy ${getSiteAppName()} --yes`;
await $`flyctl apps destroy ${getSqliteProxyAppName()} --yes`;
await $`flyctl redis destroy ${getRedisDatabaseName()} --yes`;
