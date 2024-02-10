/* eslint-disable unicorn/prefer-module -- ESLint shared rules file */

const reactRules = {
	"react/button-has-type": "error",
	"react/self-closing-comp": "error",
};

const jsxA11yRules = {
	"jsx-a11y/no-autofocus": "off",
};

const reactRefreshRules = {
	"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
};

module.exports = {
	extends: [
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/strict",
	],
	plugins: ["react-refresh"],
	rules: {
		...reactRules,
		...jsxA11yRules,
		...reactRefreshRules,
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};