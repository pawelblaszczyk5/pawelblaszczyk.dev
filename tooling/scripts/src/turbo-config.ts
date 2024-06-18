import { Config } from "effect";

const turboTeam = Config.string("TURBO_TEAM");
const turboToken = Config.redacted("TURBO_TOKEN");

export const turboConfig = Config.all([turboTeam, turboToken]).pipe(Config.map(([team, token]) => ({ team, token })));
