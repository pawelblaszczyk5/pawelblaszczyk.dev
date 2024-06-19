import { Effect, Redacted } from "effect";

import { getDatabaseName, getWebsiteName } from "#src/app-names.ts";
import { DATABASE_REPLICA_URL } from "#src/constants.ts";
import { EnvironmentOptions } from "#src/environment.ts";
import {
	FlyAppDeployError,
	FlyConfigCopyError,
	TursoDatabaseRetrieveError,
	TursoDatabaseTokenMintError,
} from "#src/error.ts";
import { runtime } from "#src/runtime.ts";
import { Shell } from "#src/shell.ts";
import { TurboConfig } from "#src/turbo-config.ts";
import { TursoApi } from "#src/turso-api.ts";

const getDatabaseInfo = (name: string) =>
	Effect.gen(function* ($) {
		const tursoApi = yield* TursoApi;

		const syncUrl = yield* $(
			Effect.tryPromise({
				catch: () => TursoDatabaseRetrieveError(),
				try: async () => tursoApi.databases.get(name),
			}),
			Effect.map(({ hostname }) => `libsql://${hostname}`),
		);

		const jwt = yield* $(
			Effect.tryPromise({
				catch: () => TursoDatabaseTokenMintError(),
				try: async () =>
					tursoApi.databases.createToken(name, {
						// NOTE it has to be full access because of the migrations
						authorization: "full-access",
						expiration: "5m",
					}),
			}),
			Effect.map(({ jwt }) => jwt),
		);

		return { jwt, syncUrl };
	});

const updateFlyApp = ({
	databaseReplicaUrl,
	databaseSyncUrl,
	databaseToken,
	name,
	turboTeam,
	turboToken,
}: {
	databaseReplicaUrl: string;
	databaseSyncUrl: string;
	databaseToken: string;
	name: string;
	turboTeam: string;
	turboToken: string;
}) =>
	Effect.gen(function* () {
		const shell = yield* Shell;

		yield* Effect.tryPromise({
			catch: () => FlyConfigCopyError(),
			try: async () => shell`cp apps/website/fly.toml .`,
		});

		yield* Effect.tryPromise({
			catch: () => FlyAppDeployError(),
			try: async () =>
				shell`flyctl deploy --app=${name} --remote-only --build-secret TURBO_TEAM=${turboTeam} --build-secret TURBO_TOKEN=${turboToken} --build-secret TURSO_AUTH_TOKEN=${databaseToken} --build-secret TURSO_SYNC_URL=${databaseSyncUrl} --build-secret TURSO_URL=${databaseReplicaUrl} --yes`,
		});
	});

const program = Effect.gen(function* () {
	const environmentOptions = yield* EnvironmentOptions;
	const websiteName = getWebsiteName(environmentOptions.name);
	const databaseName = getDatabaseName(environmentOptions.name);

	const databaseInfo = yield* getDatabaseInfo(databaseName);

	const turboConfig = yield* TurboConfig;

	yield* updateFlyApp({
		databaseReplicaUrl: DATABASE_REPLICA_URL,
		databaseSyncUrl: databaseInfo.syncUrl,
		databaseToken: databaseInfo.jwt,
		name: websiteName,
		turboTeam: turboConfig.team,
		turboToken: Redacted.value(turboConfig.token),
	});
});

await runtime.runPromise(program);
