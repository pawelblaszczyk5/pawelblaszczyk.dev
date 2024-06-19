import { Effect, Redacted } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/app-names.ts";
import { DATABASE_GROUP, DATABASE_REPLICA_URL } from "#src/constants.ts";
import { EnvironmentOptions, PRODUCTION_ENVIRONMENT_NAME } from "#src/environment.ts";
import { FlyCopyConfigError, FlyDeployAppError, FlyLaunchAppError, FlySetSecretError } from "#src/error.ts";
import { runtime } from "#src/runtime.ts";
import { Shell } from "#src/shell.ts";
import { TurboConfig } from "#src/turbo-config.ts";
import { TursoService } from "#src/turso-service.ts";

const createFlyApp = ({ name }: { name: string }) =>
	Effect.gen(function* () {
		const shell = yield* Shell;

		yield* Effect.tryPromise({
			catch: () => FlyCopyConfigError(),
			try: async () => shell`cp apps/website/fly.toml .`,
		});

		yield* Effect.tryPromise({
			catch: () => FlyLaunchAppError(),
			try: async () => shell`flyctl launch --name=${name} --copy-config --no-deploy --yes`,
		});
	});

const setupFlySecrets = ({
	databaseReplicaUrl,
	databaseSyncUrl,
	databaseToken,
}: {
	databaseReplicaUrl: string;
	databaseSyncUrl: string;
	databaseToken: string;
}) =>
	Effect.gen(function* () {
		const shell = yield* Shell;

		yield* Effect.all([
			Effect.tryPromise({
				catch: () => FlySetSecretError({ secretName: "TURSO_AUTH_TOKEN" }),
				try: async () => shell`flyctl secrets set TURSO_AUTH_TOKEN=${databaseToken}`,
			}),
			Effect.tryPromise({
				catch: () => FlySetSecretError({ secretName: "TURSO_SYNC_URL" }),
				try: async () => shell`flyctl secrets set TURSO_SYNC_URL=${databaseSyncUrl}`,
			}),
			Effect.tryPromise({
				catch: () => FlySetSecretError({ secretName: "TURSO_URL" }),
				try: async () => shell`flyctl secrets set TURSO_URL=${databaseReplicaUrl}`,
			}),
		]);
	});

const deployFlyApp = ({
	databaseReplicaUrl,
	databaseSyncUrl,
	databaseToken,
	turboTeam,
	turboToken,
}: {
	databaseReplicaUrl: string;
	databaseSyncUrl: string;
	databaseToken: string;
	turboTeam: string;
	turboToken: string;
}) =>
	Effect.gen(function* () {
		const shell = yield* Shell;

		yield* Effect.tryPromise({
			catch: () => FlyDeployAppError(),
			try: async () =>
				shell`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${turboTeam} --build-secret TURBO_TOKEN=${turboToken} --build-secret TURSO_AUTH_TOKEN=${databaseToken} --build-secret TURSO_SYNC_URL=${databaseSyncUrl} --build-secret TURSO_URL=${databaseReplicaUrl} --yes`,
		});
	});

const program = Effect.gen(function* ($) {
	const tursoService = yield* TursoService;
	const environmentOptions = yield* EnvironmentOptions;
	const websiteName = getWebsiteName(environmentOptions.name);
	const databaseName = getDatabaseName(environmentOptions.name);
	const productionDatabaseName = getDatabaseName(PRODUCTION_ENVIRONMENT_NAME);

	const databaseSyncUrl = yield* tursoService.createDatabase({
		group: DATABASE_GROUP,
		name: databaseName,
		...(environmentOptions.isProduction && { seedDatabaseName: productionDatabaseName }),
	});
	const databaseToken = yield* $(
		tursoService.createToken({
			authorization: "full-access",
			expiration: "never",
			name: databaseName,
		}),
		Effect.map(Redacted.value),
	);

	const turboConfig = yield* TurboConfig;

	yield* createFlyApp({
		name: websiteName,
	});

	yield* setupFlySecrets({
		databaseReplicaUrl: DATABASE_REPLICA_URL,
		databaseSyncUrl,
		databaseToken,
	});

	yield* deployFlyApp({
		databaseReplicaUrl: DATABASE_REPLICA_URL,
		databaseSyncUrl,
		databaseToken,
		turboTeam: turboConfig.team,
		turboToken: Redacted.value(turboConfig.token),
	});
});

await runtime.runPromise(program);
