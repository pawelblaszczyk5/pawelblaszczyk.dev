module.exports = {
	extends: ["@pawelblaszczyk.dev/eslint-config/core", "@pawelblaszczyk.dev/eslint-config/node"],
	ignorePatterns: ["node_module", ".eslintrc.cjs"],
	overrides: [
		{
			files: ["*.ts", "*.tsx", "*.js", "*.cjs"],
			parserOptions: {
				project: ["./tsconfig.json"],
				tsconfigRootDir: __dirname,
			},
		},
		{
			files: ["src/index.ts"],
			rules: {
				"canonical/filename-no-index": "off",
				"fp/no-class": "off",
				"fp/no-this": "off",
				"import-x/no-default-export": "off",
				"n/no-process-env": "off",
				"prefer-arrow-functions/prefer-arrow-functions": "off",
			},
		},
	],
	root: true,
};
