import { Context, Data, Effect, Layer, Redacted } from "effect";

import { Shell } from "#src/utils/shell.ts";

const { FlyCopyConfigError, FlyDeployAppError, FlyDestroyAppError, FlyLaunchAppError, FlySetSecretError } =
	Data.taggedEnum<
		Data.TaggedEnum<{
			FlyCopyConfigError: Record<never, never>;
			FlyDeployAppError: Record<never, never>;
			FlyDestroyAppError: Record<never, never>;
			FlyLaunchAppError: Record<never, never>;
			FlySetSecretError: { secretName: string };
		}>
	>();

const makeFlyServiceLive = (shell: Context.Tag.Service<typeof Shell>) => ({
	copyConfig: ({ from, to }: { from: string; to: string }) =>
		Effect.gen(function* () {
			yield* Effect.tryPromise({
				catch: () => FlyCopyConfigError(),
				try: async () => shell`cp ${from} ${to}`,
			});
		}),
	deployApp: ({
		buildSecrets,
		disableHighAvailability,
		name,
	}: {
		buildSecrets: Array<{ name: string; value: Redacted.Redacted | string }>;
		disableHighAvailability: boolean;
		name: string;
	}) =>
		Effect.gen(function* () {
			const flags = [`--app=${name}`, "--remote-only", "--yes"];

			buildSecrets.forEach(({ name, value }) =>
				flags.push(`--build-secret=${name}=${Redacted.isRedacted(value) ? Redacted.value(value) : value}`),
			);

			if (disableHighAvailability) flags.push("--ha=false");

			yield* Effect.tryPromise({
				catch: () => FlyDeployAppError(),
				try: async () => shell`flyctl deploy ${flags}`,
			});
		}),
	destroyApp: (name: string) =>
		Effect.gen(function* () {
			const flags = [name, "--yes"];

			yield* Effect.tryPromise({
				catch: () => FlyDestroyAppError(),
				try: async () => shell`flyctl apps destroy ${flags}`,
			});
		}),
	launchApp: (name: string) =>
		Effect.gen(function* () {
			const flags = [`--name=${name}`, "--copy-config", "--no-deploy", "--yes"];

			yield* Effect.tryPromise({
				catch: () => FlyLaunchAppError(),
				try: async () => shell`flyctl launch ${flags}`,
			});
		}),
	setSecret: ({ name, value }: { name: string; value: Redacted.Redacted | string }) =>
		Effect.gen(function* () {
			const flags = [`${name}=${Redacted.isRedacted(value) ? Redacted.value(value) : value}`];

			yield* Effect.tryPromise({
				catch: () => FlySetSecretError({ secretName: name }),
				try: async () => shell`flyctl secrets set ${flags}`,
			});
		}),
});

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- prevent intellisense expanding
interface FlyService extends ReturnType<typeof makeFlyServiceLive> {}

export const FlyService = Context.GenericTag<FlyService>("@pawelblaszczyk.dev/tooling/FlyService");

export const FlyServiceLive = Layer.effect(
	FlyService,
	Effect.gen(function* () {
		const shell = yield* Shell;

		return makeFlyServiceLive(shell);
	}),
);
