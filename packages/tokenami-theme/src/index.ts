import type { createConfig } from "@tokenami/dev";

import { defaultConfig } from "@tokenami/dev";

type Config = Parameters<typeof createConfig>[0];

type ThemeConfig = Pick<Config, "aliases" | "grid" | "keyframes" | "properties" | "responsive" | "selectors" | "theme">;

export const sharedTheme = {
	aliases: {},
	grid: "0.25rem",
	keyframes: {},
	properties: {
		...defaultConfig.properties,
	},
	responsive: {},
	selectors: {
		...defaultConfig.selectors,
	},
	theme: {},
} satisfies ThemeConfig;
