module.exports = {
	extends: ["@pawelblaszczyk.dev/eslint-config/core", "@pawelblaszczyk.dev/eslint-config/node"],
	ignorePatterns: ["node_module", ".eslintrc.cjs", "dist"],
	overrides: [
		{
			files: ["*.ts", "*.tsx", "*.js", "*.cjs"],
			parserOptions: {
				project: ["./tsconfig.json"],
				tsconfigRootDir: __dirname,
			},
		},
		{
			files: ["src/app.ts"],
			rules: {
				"n/no-process-env": "off",
			},
		},
	],
	root: true,
};
