import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	exclude: [],
	include: ["./src/**/*.{svelte,ts}"],
	outdir: "styled-system",
	preflight: true,
	theme: {
		extend: {},
	},
});
