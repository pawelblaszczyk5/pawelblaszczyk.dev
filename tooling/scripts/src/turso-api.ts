import { createClient } from "@tursodatabase/api";
import { Config, Context, Effect, Layer, Redacted } from "effect";

const makeTursoApiLive = ({ organization, token }: { organization: string; token: string }) =>
	createClient({ org: organization, token });

export const TursoApi = Context.GenericTag<ReturnType<typeof makeTursoApiLive>>(
	"@pawelblaszczyk.dev/tooling/TursoApi",
);

const tursoOrganization = Config.string("TURSO_ORGANIZATION");
const tursoToken = Config.redacted("TURSO_TOKEN");

export const TursoApiLive = Layer.effect(
	TursoApi,
	Effect.gen(function* () {
		const tursoConfig = yield* Config.all([tursoOrganization, tursoToken]).pipe(
			Config.map(([organization, token]) => ({ organization, token })),
		);

		return makeTursoApiLive({
			organization: tursoConfig.organization,
			token: Redacted.value(tursoConfig.token),
		});
	}),
);
