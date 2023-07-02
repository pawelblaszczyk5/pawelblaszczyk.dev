import type { StorybookConfig } from "@storybook/sveltekit";

const config = {
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-a11y",
	],
	docs: {
		autodocs: "tag",
	},
	framework: {
		name: "@storybook/sveltekit",
		options: {},
	},
	stories: [{ directory: "../src/lib/components", titlePrefix: "UI" }],
} satisfies StorybookConfig;

export default config;
