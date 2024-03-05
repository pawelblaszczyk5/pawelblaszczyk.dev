import type config from "./tokenami.config.ts";

export type Config = typeof config;

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {}
}
