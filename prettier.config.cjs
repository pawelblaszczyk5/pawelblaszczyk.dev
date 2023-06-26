module.exports = {
	arrowParens: "avoid",
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
	pluginSearchDirs: ["."],
	plugins: [require("prettier-plugin-svelte")],
	printWidth: 120,
	trailingComma: "all",
	useTabs: true,
};
