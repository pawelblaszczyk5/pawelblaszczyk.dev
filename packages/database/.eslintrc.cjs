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
	],
	root: true,
};
