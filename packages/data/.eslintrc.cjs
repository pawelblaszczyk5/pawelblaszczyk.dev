module.exports = {
	extends: ["@blog/eslint-config/core", "@blog/eslint-config/react", "@blog/eslint-config/node"],
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
			files: ["src/auth/index.ts"],
			rules: {
				"canonical/filename-no-index": "off",
			},
		},
	],
	root: true,
};
