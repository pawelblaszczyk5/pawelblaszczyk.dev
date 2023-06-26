import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			polyfill: false,
			precompress: true,
		}),
		output: {
			preloadStrategy: "preload-mjs",
		},
		typescript: {
			config: config => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- TypeScript config modification
				config["include"].push(
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
