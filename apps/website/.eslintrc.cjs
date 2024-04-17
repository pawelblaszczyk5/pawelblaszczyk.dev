module.exports = {
	extends: [
		"@pawelblaszczyk.dev/eslint-config/core",
		"@pawelblaszczyk.dev/eslint-config/next",
		"@pawelblaszczyk.dev/eslint-config/react",
		"@pawelblaszczyk.dev/eslint-config/node",
		"@pawelblaszczyk.dev/eslint-config/drizzle",
	],
	ignorePatterns: ["node_module", ".eslintrc.cjs", "!.tokenami/"],
	overrides: [
		{
			files: ["*.ts", "*.tsx", "*.js", "*.cjs"],
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.tooling.json", "./tsconfig.ci.json"],
				tsconfigRootDir: __dirname,
			},
		},
		{
			files: ["**/{layout,page,template,default,not-found}.tsx"],
			rules: {
				"import-x/no-default-export": "off",
				"react-refresh/only-export-components": "off",
			},
		},
		{
			files: ["./next.config.js"],
			rules: {
				"import-x/no-default-export": "off",
				"n/no-process-env": "off",
			},
		},
		{
			files: ["./.tokenami/**"],
			rules: {
				"import-x/no-default-export": "off",
				"@typescript-eslint/no-empty-interface": "off",
				"@typescript-eslint/consistent-type-definitions": "off",
				"unicorn/prevent-abbreviations": "off",
			},
		},
	],
	root: true,
};
