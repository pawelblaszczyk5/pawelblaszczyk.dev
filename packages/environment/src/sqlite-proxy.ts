/* eslint-disable n/no-process-env -- this file is centralized usage of process.env */

import * as v from "valibot";

const environmentSchema = v.object({
	DATABASE_URL: v.fallback(v.string(), "./local/sqlite.db"),
});

type Environment = v.Output<typeof environmentSchema>;

const maybeEnvironment = {
	DATABASE_URL: process.env["DATABASE_URL"],
} satisfies Record<keyof Environment, unknown>;

export const ENVIRONMENT = v.parse(environmentSchema, maybeEnvironment);
