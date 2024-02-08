module.exports = {
	extends: [
		"@blog/eslint-config/core",
		"@blog/eslint-config/next",
		"@blog/eslint-config/react",
		"@blog/eslint-config/node",
	],
	ignorePatterns: ["node_module", ".eslintrc.cjs"],
	overrides: [
		{
			files: ["*.ts", "*.tsx", "*.js", "*.cjs"],
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.tooling.json"],
				tsconfigRootDir: __dirname,
			},
		},
		{
			files: ["**/{layout,page,template,default,not-found}.tsx"],
			rules: {
				"import/no-default-export": "off",
				"react-refresh/only-export-components": "off",
			},
		},
		{
			files: ["./next.config.js"],
			rules: {
				"import/no-default-export": "off",
			},
		},
	],
	root: true,
};
