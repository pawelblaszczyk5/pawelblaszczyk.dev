import core from "@pawelblaszczyk.dev/eslint-config/core";
import node from "@pawelblaszczyk.dev/eslint-config/node";

export default [
	{
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.tooling.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	...core,
	...node,
	{
		files: ["drizzle.config.ts"],
		rules: {
			"import-x/no-default-export": "off",
			"unicorn/prevent-abbreviations": "off",
			"n/no-process-env": "off",
		},
	},
];
