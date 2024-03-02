import * as v from "valibot";

const configSchema = v.object({
	DATABASE_URL: v.fallback(v.string(), "./local/sqlite.db"),
});

type Config = v.Output<typeof configSchema>;

const maybeConfig = {
	DATABASE_URL: process.env["DATABASE_URL"],
} satisfies Record<keyof Config, unknown>;

export const CONFIG = v.parse(configSchema, maybeConfig);
