import * as v from "valibot";

import { withDevelopmentFallback } from "#src/utils.ts";

const configSchema = v.object({
	SQLITE_PROXY_URL: withDevelopmentFallback(v.string(), "http://localhost:3001"),
});

type Config = v.Output<typeof configSchema>;

const maybeConfig = {
	SQLITE_PROXY_URL: process.env["SQLITE_PROXY_URL"],
} satisfies Record<keyof Config, unknown>;

export const CONFIG = v.parse(configSchema, maybeConfig);
