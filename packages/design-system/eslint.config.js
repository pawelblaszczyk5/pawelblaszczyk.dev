import core from "@pawelblaszczyk.dev/eslint-config/core";
import react from "@pawelblaszczyk.dev/eslint-config/react";

export default [
	{
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	...core,
	...react,
	{
		files: ["src/*/index.tsx"],
		rules: {
			"canonical/filename-no-index": "off",
		},
	},
];
