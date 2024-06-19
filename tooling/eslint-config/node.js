import n from "eslint-plugin-n";

import tseslint from "typescript-eslint";

export default tseslint.config(n.configs["flat/recommended"], {
	name: "n overrides",
	rules: {
		"n/no-path-concat": "error",
		"n/no-process-env": "error",
		"n/no-unsupported-features/es-builtins": [
			"error",
			{
				ignores: [],
				version: ">=22.3.0",
			},
		],
		"n/no-unsupported-features/node-builtins": [
			"error",
			{
				ignores: [],
				version: ">=22.3.0",
			},
		],
		"n/prefer-global/buffer": "error",
		"n/prefer-promises/dns": "error",
		"n/prefer-promises/fs": "error",
	},
});
