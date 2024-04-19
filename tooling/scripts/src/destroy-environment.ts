import { $ } from "zx";

import "@pawelblaszczyk.dev/config/scripts";

import { tursoApi } from "#src/turso-api.ts";
import { DATABASE_NAME, WEBSITE_APP_NAME, setupCwd } from "#src/utils.ts";

setupCwd();

await $`flyctl apps destroy ${WEBSITE_APP_NAME} --yes`;
await tursoApi.databases.delete(DATABASE_NAME);
