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
		},
		typescript: {
			config: config => {
				const typescriptConfig = /** @type {{include: Array<string>}} */ (config);

				typescriptConfig.include.push(
					"../other/**/*.ts",
					"../drizzle.config.ts",
					"../.eslintrc.cjs",
					"../prettier.config.cjs",
					"../svelte.config.js",
				);
			},
		},
	},
	preprocess: [vitePreprocess(), mdsvex()],
};

export default config;
