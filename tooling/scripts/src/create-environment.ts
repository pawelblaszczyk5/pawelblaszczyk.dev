import { Effect, Redacted } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/app-names.ts";
import { DATABASE_GROUP, DATABASE_REPLICA_URL } from "#src/constants.ts";
import { EnvironmentOptions, PRODUCTION_ENVIRONMENT_NAME } from "#src/environment.ts";
import {
	FlyAppDeployError,
	FlyAppLaunchError,
	FlyConfigCopyError,
	FlySecretSettingError,
	TursoDatabaseCreateError,
	TursoDatabaseTokenMintError,
} from "#src/error.ts";
import { runtime } from "#src/runtime.ts";
import { Shell } from "#src/shell.ts";
import { TurboConfig } from "#src/turbo-config.ts";
import { TursoApi } from "#src/turso-api.ts";

const createDatabase = ({
	group,
	name,
	seedDatabaseName,
}: {
	group: string;
	name: string;
	seedDatabaseName?: string;
}) =>
	Effect.gen(function* ($) {
		const tursoApi = yield* TursoApi;

		const options = {
			group,
			is_schema: false,
			...(seedDatabaseName && { seed: { name: seedDatabaseName, type: "database" } }),
		} satisfies Parameters<(typeof tursoApi)["databases"]["create"]>[1];

		const syncUrl = yield* $(
			Effect.tryPromise({
				catch: () => TursoDatabaseCreateError(),
				try: async () => tursoApi.databases.create(name, options),
			}),
			Effect.map(({ hostname }) => `libsql://${hostname}`),
		);

		const jwt = yield* $(
			Effect.tryPromise({
				catch: () => TursoDatabaseTokenMintError(),
				try: async () => tursoApi.databases.createToken(name),
			}),
			Effect.map(({ jwt }) => jwt),
		);

		return {
			jwt,
			syncUrl,
		};
	});

const createFlyApp = ({ name }: { name: string }) =>
	Effect.gen(function* () {
		const shell = yield* Shell;

		yield* Effect.tryPromise({
			catch: () => FlyConfigCopyError(),
			try: async () => shell`cp apps/website/fly.toml .`,
		});

		yield* Effect.tryPromise({
			catch: () => FlyAppLaunchError(),
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
				catch: () => FlySecretSettingError({ secretName: "TURSO_AUTH_TOKEN" }),
				try: async () => shell`flyctl secrets set TURSO_AUTH_TOKEN=${databaseToken}`,
			}),
			Effect.tryPromise({
				catch: () => FlySecretSettingError({ secretName: "TURSO_SYNC_URL" }),
				try: async () => shell`flyctl secrets set TURSO_SYNC_URL=${databaseSyncUrl}`,
			}),
			Effect.tryPromise({
				catch: () => FlySecretSettingError({ secretName: "TURSO_URL" }),
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
			catch: () => FlyAppDeployError(),
			try: async () =>
				shell`flyctl deploy --remote-only --ha=false --build-secret TURBO_TEAM=${turboTeam} --build-secret TURBO_TOKEN=${turboToken} --build-secret TURSO_AUTH_TOKEN=${databaseToken} --build-secret TURSO_SYNC_URL=${databaseSyncUrl} --build-secret TURSO_URL=${databaseReplicaUrl} --yes`,
		});
	});

const program = Effect.gen(function* () {
	const environmentOptions = yield* EnvironmentOptions;
	const websiteName = getWebsiteName(environmentOptions.name);
	const databaseName = getDatabaseName(environmentOptions.name);
	const productionDatabaseName = getDatabaseName(PRODUCTION_ENVIRONMENT_NAME);

	const database = yield* createDatabase({
		group: DATABASE_GROUP,
		name: databaseName,
		...(environmentOptions.isProduction && { seedDatabaseName: productionDatabaseName }),
	});

	const turboConfig = yield* TurboConfig;

	yield* createFlyApp({
		name: websiteName,
	});

	yield* setupFlySecrets({
		databaseReplicaUrl: DATABASE_REPLICA_URL,
		databaseSyncUrl: database.syncUrl,
		databaseToken: database.jwt,
	});

	yield* deployFlyApp({
		databaseReplicaUrl: DATABASE_REPLICA_URL,
		databaseSyncUrl: database.syncUrl,
		databaseToken: database.jwt,
		turboTeam: turboConfig.team,
		turboToken: Redacted.value(turboConfig.token),
	});
});

await runtime.runPromise(program);
