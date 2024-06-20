import type { Client } from "@libsql/client";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { Config, Context, Data, Effect, Layer, Match, Redacted } from "effect";

import { entries } from "#src/schema.ts";

class TursoSyncError extends Data.TaggedClass("TursoSyncError") {}
class DatabaseMigrationError extends Data.TaggedClass("DatabaseMigrationError") {}

type TursoClientOptions =
	| { _tag: "local"; url: string }
	| { _tag: "remote"; authToken: string; replicaUrl: string; syncUrl: string };

const makeTursoClient = Match.type<TursoClientOptions>().pipe(
	Match.tag("remote", options =>
		createClient({
			authToken: options.authToken,
			syncUrl: options.syncUrl,
			url: options.replicaUrl,
		}),
	),
	Match.tag("local", options =>
		createClient({
			url: options.url,
		}),
	),
	Match.exhaustive,
);

const makeDatabaseLive = (client: Client) => {
	const database = drizzle(client, {
		schema: { entries },
	});

	return database;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- prevent intellisense expanding
interface Database extends ReturnType<typeof makeDatabaseLive> {}

export const Database = Context.GenericTag<Database>("@pawelblaszczyk.dev/database/Database");

const DatabaseLocalConfig = Config.string("DATABASE_LOCAL_URL").pipe(
	Config.map(
		url =>
			({
				_tag: "local",
				url,
			}) as const,
	),
);

const DatabaseRemoteConfig = Config.all([
	Config.redacted("DATABASE_AUTH_TOKEN"),
	Config.redacted("DATABASE_SYNC_URL"),
	Config.string("DATABASE_REPLICA_URL"),
]).pipe(
	Config.map(
		([authToken, syncUrl, replicaUrl]) =>
			({
				_tag: "remote",
				authToken,
				replicaUrl,
				syncUrl,
			}) as const,
	),
);

export const DatabaseLive = Layer.effect(
	Database,
	Effect.gen(function* () {
		const databaseConfig = yield* Effect.orElse(DatabaseRemoteConfig, () => DatabaseLocalConfig);

		const client = Match.value(databaseConfig).pipe(
			Match.tag("local", config =>
				makeTursoClient({
					_tag: "local",
					url: config.url,
				}),
			),
			Match.tag("remote", config => {
				const client = makeTursoClient({
					_tag: "remote",
					authToken: Redacted.value(config.authToken),
					replicaUrl: config.replicaUrl,
					syncUrl: Redacted.value(config.syncUrl),
				});

				Redacted.unsafeWipe(config.authToken);
				Redacted.unsafeWipe(config.syncUrl);

				return client;
			}),
			Match.exhaustive,
		);

		if (databaseConfig._tag === "remote")
			yield* Effect.tryPromise({
				catch: () => new TursoSyncError(),
				try: async () => client.sync(),
			});

		const database = makeDatabaseLive(client);

		yield* Effect.tryPromise({
			catch: () => new DatabaseMigrationError(),
			try: async () =>
				migrate(database, {
					migrationsFolder: "node_modules/@pawelblaszczyk.dev/database/drizzle/",
				}),
		});

		return database;
	}),
);
