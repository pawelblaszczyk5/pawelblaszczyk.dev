import { $ } from "zx";

import "@pawelblaszczyk.dev/config/scripts";

import { getWebsiteAppName, setupCwd } from "#src/utils.ts";

setupCwd();

await $`flyctl apps destroy ${getWebsiteAppName()} --yes`;
