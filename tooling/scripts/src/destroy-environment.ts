import { Data, Effect } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/app-names.ts";
import { environmentOptions } from "#src/environment.ts";
import { runtime } from "#src/runtime.ts";
import { Shell } from "#src/shell.ts";
import { TursoApi } from "#src/turso-api.ts";

const { FlyAppDestroyError, TursoDatabaseDestroyError } = Data.taggedEnum<
	Data.TaggedEnum<{
		FlyAppDestroyError: Record<never, never>;
		TursoDatabaseDestroyError: Record<never, never>;
	}>
>();

const deleteFlyApp = (name: string) =>
	Effect.gen(function* () {
		const shell = yield* Shell;

		yield* Effect.tryPromise({
			catch: () => FlyAppDestroyError(),
			try: async () => shell`flyctl apps destroy ${name} --yes`,
		});
	});

const deleteDatabase = (name: string) =>
	Effect.gen(function* () {
		const tursoApi = yield* TursoApi;

		yield* Effect.tryPromise({
			catch: () => TursoDatabaseDestroyError(),
			try: async () => tursoApi.databases.delete(name),
		});
	});

const program = Effect.gen(function* () {
	const environment = yield* environmentOptions;
	const websiteName = getWebsiteName(environment.name);
	const databaseName = getDatabaseName(environment.name);

	yield* deleteFlyApp(websiteName);
	yield* deleteDatabase(databaseName);
});

await runtime.runPromise(program);
