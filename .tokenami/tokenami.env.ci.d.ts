/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface -- library module augmenting */

// eslint-disable-next-line spaced-comment -- TypeScript references
/// <reference types="./tokenami.env.d.ts" />

// This errors out in IDE because this file isn't matched by root tsconfig.json
import type { Config } from ".tokenami/tokenami.env";

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {}
}
