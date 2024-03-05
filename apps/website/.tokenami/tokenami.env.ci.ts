import type { Config } from "./tokenami.env";

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {
		CI: true;
	}
}
