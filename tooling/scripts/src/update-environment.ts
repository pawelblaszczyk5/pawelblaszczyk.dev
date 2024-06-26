import { Effect, Redacted } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/utils/app-names.ts";
import { DATABASE_REPLICA_URL, FLY_SECRETS_NAMES } from "#src/utils/constants.ts";
import { EnvironmentOptions } from "#src/utils/environment.ts";
import { FlyService } from "#src/utils/fly-service.ts";
import { runtime } from "#src/utils/runtime.ts";
import { TurboConfig } from "#src/utils/turbo-config.ts";
import { TursoService } from "#src/utils/turso-service.ts";

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
	);

	const turboConfig = yield* TurboConfig;

	yield* flyService.copyConfig({ from: "apps/website/fly.toml", to: "." });

	yield* flyService.deployApp({
		buildSecrets: [
			{ name: FLY_SECRETS_NAMES.DATABASE_AUTH_TOKEN, value: databaseToken },
			{ name: FLY_SECRETS_NAMES.DATABASE_SYNC_URL, value: databaseSyncUrl },
			{ name: FLY_SECRETS_NAMES.DATABASE_REPLICA_URL, value: DATABASE_REPLICA_URL },
			{ name: FLY_SECRETS_NAMES.TURBO_TEAM, value: turboConfig.team },
			{ name: FLY_SECRETS_NAMES.TURBO_TOKEN, value: turboConfig.token },
		],
		disableHighAvailability: false,
		name: websiteName,
	});

	Redacted.unsafeWipe(turboConfig.token);
	Redacted.unsafeWipe(databaseToken);
});

await runtime.runPromise(program);
