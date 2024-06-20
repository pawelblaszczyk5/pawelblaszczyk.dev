import { CliConfig, Options } from "@effect/cli";
import { NodeContext } from "@effect/platform-node";
import { Schema } from "@effect/schema";
import { Data, Effect } from "effect";

const { ImplicitProductionEnvironmentUsageError } = Data.taggedEnum<
	Data.TaggedEnum<{
		ImplicitProductionEnvironmentUsageError: Record<never, never>;
	}>
>();

export const PRODUCTION_ENVIRONMENT_NAME = "production";

export const EnvironmentOptions = Options.processCommandLine(
	Options.orElse(
		Options.text("environment").pipe(Options.withAlias("e")),
		Options.boolean("production").pipe(Options.withSchema(Schema.Literal(true))),
	),
	process.argv.slice(2),
	CliConfig.defaultConfig,
).pipe(
	Effect.provide(NodeContext.layer),
	Effect.flatMap(result => {
		const parsedOption = result[2];

		if (parsedOption === PRODUCTION_ENVIRONMENT_NAME) return Effect.fail(ImplicitProductionEnvironmentUsageError());

		if (typeof parsedOption === "string") return Effect.succeed({ isProduction: false, name: parsedOption });

		return Effect.succeed({ isProduction: true, name: PRODUCTION_ENVIRONMENT_NAME });
	}),
);
