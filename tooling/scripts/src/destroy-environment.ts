import { Effect } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/app-names.ts";
import { EnvironmentOptions } from "#src/environment.ts";
import { FlyService } from "#src/fly-service.ts";
import { runtime } from "#src/runtime.ts";
import { TursoService } from "#src/turso-service.ts";

const program = Effect.gen(function* () {
	const environmentOptions = yield* EnvironmentOptions;

	const tursoService = yield* TursoService;
	const flyService = yield* FlyService;
	
	const websiteName = getWebsiteName(environmentOptions.name);
	const databaseName = getDatabaseName(environmentOptions.name);

	yield* flyService.destroyApp(websiteName);
	yield* tursoService.destroyDatabase(databaseName);
});

await runtime.runPromise(program);
