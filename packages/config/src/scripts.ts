import * as v from "valibot";

const configSchema = v.object({
	FLY_API_TOKEN: v.string(),
	TURBO_TEAM: v.string(),
	TURBO_TOKEN: v.string(),
});

type Config = v.Output<typeof configSchema>;

const maybeConfig = {
	FLY_API_TOKEN: process.env["FLY_API_TOKEN"] ?? "",
	TURBO_TEAM: process.env["TURBO_TEAM"] ?? "",
	TURBO_TOKEN: process.env["TURBO_TOKEN"] ?? "",
} satisfies Record<keyof Config, unknown>;

export const CONFIG = v.parse(configSchema, maybeConfig);
