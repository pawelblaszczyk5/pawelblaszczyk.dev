import { Effect } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/app-names.ts";
import { EnvironmentOptions } from "#src/environment.ts";
import { FlyAppDestroyError, TursoDatabaseDestroyError } from "#src/error.ts";
import { runtime } from "#src/runtime.ts";
import { Shell } from "#src/shell.ts";
import { TursoApi } from "#src/turso-api.ts";

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
	const environmentOptions = yield* EnvironmentOptions;
	const websiteName = getWebsiteName(environmentOptions.name);
	const databaseName = getDatabaseName(environmentOptions.name);

	yield* deleteFlyApp(websiteName);
	yield* deleteDatabase(databaseName);
});

await runtime.runPromise(program);
