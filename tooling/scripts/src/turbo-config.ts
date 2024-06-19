import { Config } from "effect";

export const TurboConfig = Config.all([Config.string("TURBO_TEAM"), Config.redacted("TURBO_TOKEN")]).pipe(
	Config.map(([team, token]) => ({ team, token })),
);
