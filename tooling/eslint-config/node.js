const nodeRules = {
	"n/no-extraneous-import": "off",
	"n/no-missing-import": "off",
	"n/no-path-concat": "error",
	"n/no-process-env": "error",
	"n/no-sync": "off",
	"n/no-unpublished-import": "off",
	"n/no-unsupported-features/es-builtins": [
		"error",
		{
			ignores: [],
			version: ">=20.10.0",
		},
	],
	"n/no-unsupported-features/es-syntax": "off",
	"n/no-unsupported-features/node-builtins": [
		"error",
		{
			ignores: [],
			version: ">=20.10.0",
		},
	],
	"n/prefer-global/buffer": "error",
	"n/prefer-promises/dns": "error",
	"n/prefer-promises/fs": "error",
};

module.exports = {
	extends: ["plugin:n/recommended"],
	rules: {
		...nodeRules,
	},
};
