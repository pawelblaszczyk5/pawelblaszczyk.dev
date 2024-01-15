/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface -- library module augmenting */

import type config from ".tokenami/tokenami.config";
import type { TokenamiProperties } from "@tokenami/dev";

export type Config = typeof config;

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {}
}

declare module "react" {
	interface CSSProperties extends TokenamiProperties {}
}
