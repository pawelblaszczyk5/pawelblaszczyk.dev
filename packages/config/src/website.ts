import * as v from "valibot";

const configSchema = v.object({
	TURSO_AUTH_TOKEN: v.optional(v.string()),
	TURSO_SYNC_URL: v.optional(v.string()),
	TURSO_URL: v.string(),
});

type Config = v.InferOutput<typeof configSchema>;

const maybeConfig = {
	TURSO_AUTH_TOKEN: process.env["TURSO_AUTH_TOKEN"],
	TURSO_SYNC_URL: process.env["TURSO_SYNC_URL"],
	TURSO_URL: process.env["TURSO_URL"],
} satisfies Record<keyof Config, unknown>;

export const CONFIG = v.parse(configSchema, maybeConfig);
