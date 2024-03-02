import * as v from "valibot";

const environmentSchema = v.object({
	FLY_ACCESS_TOKEN: v.string(),
	TURBO_TEAM: v.string(),
	TURBO_TOKEN: v.string(),
});

type Environment = v.Output<typeof environmentSchema>;

const maybeEnvironment = {
	FLY_ACCESS_TOKEN: process.env["FLY_ACCESS_TOKEN"],
	TURBO_TEAM: process.env["TURBO_TEAM"],
	TURBO_TOKEN: process.env["TURBO_TOKEN"],
} satisfies Record<keyof Environment, unknown>;

export const ENVIRONMENT = v.parse(environmentSchema, maybeEnvironment);
