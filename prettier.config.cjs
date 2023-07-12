// eslint-disable-next-line unicorn/no-empty-file -- https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2175
module.exports = {
	arrowParens: "avoid",
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
	pluginSearchDirs: ["."],
	plugins: [require("prettier-plugin-svelte")],
	printWidth: 120,
	trailingComma: "all",
	useTabs: true,
};
