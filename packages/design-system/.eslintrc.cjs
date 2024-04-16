module.exports = {
	extends: ["@pawelblaszczyk.dev/eslint-config/core", "@pawelblaszczyk.dev/eslint-config/node"],
	ignorePatterns: ["node_module", ".eslintrc.cjs", "!.tokenami/"],
	overrides: [
		{
			files: ["*.ts", "*.tsx", "*.js", "*.cjs"],
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.ci.json"],
				tsconfigRootDir: __dirname,
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
		{
			files: ["./src/*/index.tsx"],
			rules: {
				"canonical/filename-no-index": "off",
			},
		},
	],
	root: true,
};
