import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	build: {
		rollupOptions: {
			treeshake: "smallest",
		},
	},
	define: {
		"import.meta.vitest": "undefined",
	},
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ["styled-system"],
		},
	},
	test: {
		include: ["src/**/*.{test,spec}.{ts}"],
		includeSource: ["src/**/*.{svelte,ts}"],
	},
});
