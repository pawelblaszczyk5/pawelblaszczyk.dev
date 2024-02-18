import type config from "#src/.tokenami/tokenami.config.ts";

export type Config = typeof config;

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {}
}
