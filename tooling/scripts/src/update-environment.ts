import { Effect, Redacted } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/app-names.ts";
import { DATABASE_REPLICA_URL, FLY_SECRETS_NAMES } from "#src/constants.ts";
import { EnvironmentOptions } from "#src/environment.ts";
import { FlyService } from "#src/fly-service.ts";
import { runtime } from "#src/runtime.ts";
import { TurboConfig } from "#src/turbo-config.ts";
import { TursoService } from "#src/turso-service.ts";

const program = Effect.gen(function* ($) {
	const environmentOptions = yield* EnvironmentOptions;

	const tursoService = yield* TursoService;
	const flyService = yield* FlyService;

	const websiteName = getWebsiteName(environmentOptions.name);
	const databaseName = getDatabaseName(environmentOptions.name);

	const databaseSyncUrl = yield* tursoService.getDatabaseSyncUrl(databaseName);
	const databaseToken = yield* $(
		tursoService.createToken({
			authorization: "full-access",
			expiration: "5m",
			name: databaseName,
		}),
		Effect.map(Redacted.value),
	);

	const turboConfig = yield* TurboConfig;

	yield* flyService.copyConfig({ from: "apps/website/fly.toml", to: "." });

	yield* flyService.deployApp({
		buildSecrets: [
			{ name: FLY_SECRETS_NAMES.TURSO_AUTH_TOKEN, value: databaseToken },
			{ name: FLY_SECRETS_NAMES.TURSO_SYNC_URL, value: databaseSyncUrl },
			{ name: FLY_SECRETS_NAMES.TURSO_URL, value: DATABASE_REPLICA_URL },
			{ name: FLY_SECRETS_NAMES.TURBO_TEAM, value: turboConfig.team },
			{ name: FLY_SECRETS_NAMES.TURBO_TOKEN, value: Redacted.value(turboConfig.token) },
		],
		disableHighAvailability: false,
		name: websiteName,
	});
});

await runtime.runPromise(program);
