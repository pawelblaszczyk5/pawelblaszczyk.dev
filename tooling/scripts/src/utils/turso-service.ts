import { createClient } from "@tursodatabase/api";
import { Config, Context, Data, Effect, Layer, Redacted } from "effect";

class TursoCreateDatabaseError extends Data.TaggedError("TursoCreateDatabaseError") {}
class TursoCreateTokenError extends Data.TaggedError("TursoCreateTokenError") {}
class TursoDestroyDatabaseError extends Data.TaggedError("TursoDestroyDatabaseError") {}
class TursoRetrieveDatabaseError extends Data.TaggedError("TursoRetrieveDatabaseError") {}

const makeTursoServiceLive = ({ organization, token }: { organization: string; token: Redacted.Redacted }) => {
	const client = createClient({ org: organization, token: Redacted.value(token) });

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
						catch: () => new TursoCreateDatabaseError(),
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
						catch: () => new TursoCreateTokenError(),
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
					catch: () => new TursoDestroyDatabaseError(),
					try: async () => client.databases.delete(name),
				});
			}),
		getDatabaseSyncUrl: (name: string) =>
			Effect.gen(function* ($) {
				const syncUrl = yield* $(
					Effect.tryPromise({
						catch: () => new TursoRetrieveDatabaseError(),
						try: async () => client.databases.get(name),
					}),
					Effect.map(({ hostname }) => `libsql://${hostname}`),
				);

				return syncUrl;
			}),
	};
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- prevent intellisense expanding
interface TursoService extends ReturnType<typeof makeTursoServiceLive> {}

export const TursoService = Context.GenericTag<TursoService>("@pawelblaszczyk.dev/tooling/TursoService");

export const TursoServiceLive = Layer.effect(
	TursoService,
	Effect.gen(function* ($) {
		const organization = yield* Config.string("TURSO_ORGANIZATION");
		const token = yield* $(Config.redacted("TURSO_TOKEN"));

		const tursoServiceLive = makeTursoServiceLive({
			organization,
			token,
		});

		Redacted.unsafeWipe(token);

		return tursoServiceLive;
	}),
);
