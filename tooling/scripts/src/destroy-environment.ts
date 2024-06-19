import { Effect } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/utils/app-names.ts";
import { EnvironmentOptions } from "#src/utils/environment.ts";
import { FlyService } from "#src/utils/fly-service.ts";
import { runtime } from "#src/utils/runtime.ts";
import { TursoService } from "#src/utils/turso-service.ts";

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
