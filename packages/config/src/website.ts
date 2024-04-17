import * as v from "valibot";

const configSchema = v.object({
	TURSO_DATABASE_TOKEN: v.optional(v.string()),
	TURSO_DATABASE_URL: v.optional(v.string()),
});

type Config = v.Output<typeof configSchema>;

const maybeConfig = {
	TURSO_DATABASE_TOKEN: process.env["TURSO_DATABASE_TOKEN"],
	TURSO_DATABASE_URL: process.env["TURSO_DATABASE_URL"],
} satisfies Record<keyof Config, unknown>;

export const CONFIG = v.parse(configSchema, maybeConfig);
