module.exports = {
	extends: ["@blog/eslint-config/core", "@blog/eslint-config/node"],
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
	rules: {
		"import/no-default-export": "off",
	},
	root: true,
};
