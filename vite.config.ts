import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			treeshake: "smallest",
		},
	},
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ["styled-system"],
		},
	},
});
