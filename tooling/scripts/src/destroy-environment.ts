import { Effect } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/app-names.ts";
import { EnvironmentOptions } from "#src/environment.ts";
import { FlyAppDestroyError } from "#src/error.ts";
import { runtime } from "#src/runtime.ts";
import { Shell } from "#src/shell.ts";
import { TursoService } from "#src/turso-api.ts";

const deleteFlyApp = (name: string) =>
	Effect.gen(function* () {
		const shell = yield* Shell;

		yield* Effect.tryPromise({
			catch: () => FlyAppDestroyError(),
			try: async () => shell`flyctl apps destroy ${name} --yes`,
		});
	});

const program = Effect.gen(function* () {
	const environmentOptions = yield* EnvironmentOptions;
	const tursoService = yield* TursoService;
	const websiteName = getWebsiteName(environmentOptions.name);
	const databaseName = getDatabaseName(environmentOptions.name);

	yield* deleteFlyApp(websiteName);
	yield* tursoService.destroyDatabase(databaseName);
});

await runtime.runPromise(program);
