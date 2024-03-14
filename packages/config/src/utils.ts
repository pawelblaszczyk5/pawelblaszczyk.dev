import * as v from "valibot";

const IS_PRODUCTION = process.env["NODE_ENV"] === "production";

export const withDevelopmentFallback = <Output>(schema: v.BaseSchema<unknown, Output>, fallback: Output) => {
	if (IS_PRODUCTION) return schema;

	return v.fallback(schema, fallback);
};
