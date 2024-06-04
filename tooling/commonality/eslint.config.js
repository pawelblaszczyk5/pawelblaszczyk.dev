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
		rules: {
			"import-x/no-default-export": "off",
		},
	},
];
