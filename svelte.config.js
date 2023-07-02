import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".svx"],
	kit: {
		adapter: adapter({
			polyfill: false,
			precompress: true,
		}),
		alias: {
			"~": "src",
			"~/*": "src/*",
			"styled-system": "./styled-system",
			"styled-system/*": "./styled-system/*",
		},
		typescript: {
			config: config => {
				const typescriptConfig = /** @type import('type-fest').TsConfigJson */ (config);

				typescriptConfig.include?.push(
					"../other/**/*.ts",
					"../drizzle.config.ts",
					"../.eslintrc.cjs",
					"../prettier.config.cjs",
					"../svelte.config.js",
					"../postcss.config.cjs",
					"../playwright.config.ts",
					"../tests/**/*.ts",
					"../.storybook/**/*.ts",
					"../panda.config.ts",
					"../styled-system/**/*.ts",
				);
			},
		},
	},
	preprocess: [vitePreprocess(), mdsvex()],
};

export default config;
