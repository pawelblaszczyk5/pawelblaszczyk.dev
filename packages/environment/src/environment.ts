/* eslint-disable n/no-process-env -- this file is centralized usage of process.env */

import * as v from "valibot";

const environmentSchema = v.object({
	SQLITE_PROXY_URL: v.string(),
});

type Environment = v.Output<typeof environmentSchema>;

const maybeEnvironment = {
	SQLITE_PROXY_URL: process.env["SQLITE_PROXY_URL"],
} satisfies Record<keyof Environment, unknown>;

export const ENVIRONMENT = v.parse(environmentSchema, maybeEnvironment);
