import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			polyfill: false,
			precompress: true,
		}),
		alias: {
			"~": "src",
			"~/*": "src/*",
		},
		typescript: {
			config: config => {
				const typeScriptConfig = /** @type {{include: Array<string>}} */ (config);

				typeScriptConfig.include.push(
					"../other/**/*.ts",
					"../drizzle.config.ts",
					"../.eslintrc.cjs",
					"../prettier.config.cjs",
					"../svelte.config.js",
				);
			},
		},
	},
	preprocess: vitePreprocess(),
};

export default config;
