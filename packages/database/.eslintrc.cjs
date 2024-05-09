module.exports = {
	extends: ["@pawelblaszczyk.dev/eslint-config/core", "@pawelblaszczyk.dev/eslint-config/node"],
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
			files: ["drizzle.config.ts"],
			rules: {
				"import-x/no-default-export": "off",
				"unicorn/prevent-abbreviations": "off",
				"n/no-process-env": "off",
			},
		},
	],
	root: true,
};
