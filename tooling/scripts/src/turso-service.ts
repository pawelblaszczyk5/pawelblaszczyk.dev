import { createClient } from "@tursodatabase/api";
import { Config, Context, Effect, Layer, Redacted } from "effect";

import {
	TursoCreateDatabaseError,
	TursoCreateTokenError,
	TursoDestroyDatabaseError,
	TursoRetrieveDatabaseError,
} from "#src/error.ts";

const makeTursoServiceLive = ({ organization, token }: { organization: string; token: string }) => {
	const client = createClient({ org: organization, token });

	return {
		createDatabase: ({ group, name, seedDatabaseName }: { group: string; name: string; seedDatabaseName?: string }) =>
			Effect.gen(function* ($) {
				const options = {
					group,
					is_schema: false,
					...(seedDatabaseName && { seed: { name: seedDatabaseName, type: "database" } }),
				} satisfies Parameters<(typeof client)["databases"]["create"]>[1];

				const syncUrl = yield* $(
					Effect.tryPromise({
						catch: () => TursoCreateDatabaseError(),
						try: async () => client.databases.create(name, options),
					}),
					Effect.map(({ hostname }) => `libsql://${hostname}`),
				);

				return syncUrl;
			}),
		createToken: ({
			authorization,
			expiration,
			name,
		}: {
			authorization: "full-access" | "read-only";
			expiration: string;
			name: string;
		}) =>
			Effect.gen(function* ($) {
				const token = yield* $(
					Effect.tryPromise({
						catch: () => TursoCreateTokenError(),
						try: async () =>
							client.databases.createToken(name, {
								authorization,
								expiration,
							}),
					}),
					Effect.map(({ jwt }) => Redacted.make(jwt)),
				);

				return token;
			}),
		destroyDatabase: (name: string) =>
			Effect.gen(function* () {
				yield* Effect.tryPromise({
					catch: () => TursoDestroyDatabaseError(),
					try: async () => client.databases.delete(name),
				});
			}),
		getDatabaseSyncUrl: (name: string) =>
			Effect.gen(function* ($) {
				const syncUrl = yield* $(
					Effect.tryPromise({
						catch: () => TursoRetrieveDatabaseError(),
						try: async () => client.databases.get(name),
					}),
					Effect.map(({ hostname }) => `libsql://${hostname}`),
				);

				return syncUrl;
			}),
	};
};

export const TursoService = Context.GenericTag<ReturnType<typeof makeTursoServiceLive>>(
	"@pawelblaszczyk.dev/tooling/TursoService",
);

export const TursoServiceLive = Layer.effect(
	TursoService,
	Effect.gen(function* ($) {
		const organization = yield* Config.string("TURSO_ORGANIZATION");
		const token = yield* $(Config.redacted("TURSO_TOKEN"), Effect.map(Redacted.value));

		return makeTursoServiceLive({
			organization,
			token,
		});
	}),
);
