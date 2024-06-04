import core from "@pawelblaszczyk.dev/eslint-config/core";
import drizzle from "@pawelblaszczyk.dev/eslint-config/drizzle";
import next from "@pawelblaszczyk.dev/eslint-config/next";
import node from "@pawelblaszczyk.dev/eslint-config/node";
import react from "@pawelblaszczyk.dev/eslint-config/react";

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
	...next,
	...drizzle,
	...node,
	...react,
	{
		files: ["**/{layout,page,template,default,not-found}.tsx"],
		rules: {
			"import-x/no-default-export": "off",
			"react-refresh/only-export-components": "off",
		},
	},
	{
		files: ["next.config.js"],
		rules: {
			"import-x/no-default-export": "off",
		},
	},
];
