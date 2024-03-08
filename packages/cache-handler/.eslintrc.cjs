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
			files: ["src/handler.ts"],
			rules: {
				"fp/no-class": "off",
				"fp/no-this": "off",
				"import/no-default-export": "off",
				"prefer-arrow-functions/prefer-arrow-functions": "off",
			},
		},
	],
	root: true,
};
