const builtinRules = {
	"arrow-body-style": ["error", "as-needed"],
	curly: ["error", "multi", "consistent"],
	"default-case-last": "error",
	eqeqeq: "error",
	"linebreak-style": ["error", "unix"],
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
	"no-alert": "warn",
	"no-console": "warn",
	"no-div-regex": "error",
	"no-else-return": ["error", { allowElseIf: false }],
	"no-eval": "error",
	"no-extend-native": "error",
	"no-floating-decimal": "error",
	"no-implicit-coercion": "error",
	"no-mixed-spaces-and-tabs": "off",
	"no-param-reassign": "error",
	"no-plusplus": "error",
	"no-promise-executor-return": "error",
	"no-regex-spaces": "error",
	"no-restricted-syntax": [
		"error",
		{
			message: "Don't declare enums",
			selector: "TSEnumDeclaration",
		},
	],
	"no-return-assign": "error",
	"no-self-compare": "error",
	"no-sequences": "error",
	"no-template-curly-in-string": "error",
	"no-undef": "off",
	"no-undef-init": "error",
	"no-underscore-dangle": "error",
	"no-unneeded-ternary": "error",
	"no-unused-vars": "off",
	"no-useless-call": "error",
	"no-useless-computed-key": "error",
	"no-useless-concat": "error",
	"no-var": "error",
	"no-warning-comments": [
		"warn",
		{
			location: "start",
			terms: ["TODO", "FIXME"],
		},
	],
	"object-shorthand": ["error", "always"],
	"one-var": ["error", "never"],
	"one-var-declaration-per-line": "error",
	"operator-assignment": ["error", "always"],
	"padding-line-between-statements": [
		"error",
		{ blankLine: "always", next: "*", prev: ["const", "let", "var"] },
		{
			blankLine: "any",
			next: ["const", "let", "var"],
			prev: ["const", "let", "var"],
		},
	],
	"prefer-const": "error",
	"prefer-exponentiation-operator": "error",
	"prefer-object-has-own": "error",
	"prefer-object-spread": "error",
	"prefer-promise-reject-errors": "error",
	"prefer-regex-literals": [
		"error",
		{
			disallowRedundantWrapping: true,
		},
	],
	"prefer-rest-params": "error",
	"prefer-spread": "error",
	"prefer-template": "error",
	"quote-props": [
		"error",
		"as-needed",
		{
			numbers: true,
		},
	],
	radix: "error",
	"require-atomic-updates": "error",
	"require-unicode-regexp": "error",
	"require-yield": "error",
	"spaced-comment": ["error", "always"],
	"symbol-description": "error",
	yoda: ["error", "never"],
};

const preferArrowFunctionsRules = {
	"prefer-arrow-functions/prefer-arrow-functions": [
		"error",
		{
			classPropertiesAllowed: true,
			disallowPrototype: true,
			returnStyle: "unchanged",
			singleReturnOnly: false,
		},
	],
};

const typescriptRules = {
	"@typescript-eslint/array-type": ["error", { default: "generic", readonly: "generic" }],
	"@typescript-eslint/consistent-generic-constructors": ["error", "constructor"],
	"@typescript-eslint/consistent-type-definitions": ["error", "type"],
	"@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			disallowTypeAnnotations: false,
			fixStyle: "separate-type-imports",
			prefer: "type-imports",
		},
	],
	"@typescript-eslint/default-param-last": "error",
	"@typescript-eslint/method-signature-style": ["error", "property"],
	"@typescript-eslint/no-empty-function": "off",
	"@typescript-eslint/no-explicit-any": "off",
	"@typescript-eslint/no-misused-promises": "error",
	"@typescript-eslint/no-redundant-type-constituents": "error",
	"@typescript-eslint/no-restricted-imports": [
		"error",
		{
			patterns: [
				{
					group: ["./*", "!./$types", "../*"],
					message: "Don't use relative imports",
				},
			],
		},
	],
	"@typescript-eslint/no-throw-literal": "off",
	"@typescript-eslint/no-unused-expressions": "error",
	"@typescript-eslint/no-unused-vars": "off",
	"@typescript-eslint/no-use-before-define": [
		"error",
		{
			allowNamedExports: false,
			classes: true,
			enums: true,
			functions: true,
			ignoreTypeReferences: false,
			typedefs: true,
			variables: true,
		},
	],
	"@typescript-eslint/no-useless-empty-export": "error",
	"@typescript-eslint/promise-function-async": "error",
	"@typescript-eslint/require-await": "off",
};

const canonicalRules = {
	"canonical/filename-no-index": "error",
};

const eslintCommentsRules = {
	"eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
	"eslint-comments/no-unused-disable": "error",
	"eslint-comments/require-description": "error",
};

const fpRules = {
	"fp/no-arguments": "error",
	"fp/no-class": "error",
	"fp/no-delete": "error",
	"fp/no-loops": "error",
	"fp/no-mutating-assign": "error",
	"fp/no-this": "error",
	"fp/no-valueof-field": "error",
};

const importRules = {
	"import/consistent-type-specifier-style": ["error", "prefer-top-level"],
	"import/export": "error",
	"import/first": "error",
	"import/newline-after-import": "error",
	"import/no-cycle": [
		"error",
		{
			allowUnsafeDynamicCyclicDependency: true,
		},
	],
	"import/no-deprecated": "warn",
	"import/no-duplicates": "error",
	"import/no-extraneous-dependencies": "error",
	"import/no-named-as-default": "error",
	"import/no-named-as-default-member": "error",
};

const unicornRules = {
	"unicorn/empty-brace-spaces": "off",
	"unicorn/no-array-for-each": "off",
	"unicorn/no-array-reduce": "off",
	"unicorn/no-await-expression-member": "off",
	"unicorn/no-null": "off",
	"unicorn/no-unsafe-regex": "error",
	"unicorn/no-unused-properties": "error",
	"unicorn/numeric-separators-style": [
		"error",
		{
			binary: {
				groupLength: 4,
				minimumDigits: 0,
			},
			hexadecimal: {
				groupLength: 2,
				minimumDigits: 0,
			},
			number: {
				groupLength: 3,
				minimumDigits: 4,
			},
			octal: {
				groupLength: 4,
				minimumDigits: 0,
			},
			onlyIfContainsSeparator: false,
		},
	],
	"unicorn/prefer-native-coercion-functions": "off",
	"unicorn/prevent-abbreviations": "off",
	"unicorn/require-post-message-target-origin": "error",
};

const perfectionistRules = {
	"perfectionist/sort-imports": [
		"error",
		{
			groups: [
				["builtin-type", "type"],
				["builtin", "external"],
				"internal-type",
				"internal",
				["parent-type", "sibling-type", "index-type"],
				["parent", "sibling", "index"],
				"side-effect",
				"style",
				"object",
				"unknown",
			],
			order: "asc",
			type: "natural",
		},
	],
};

const svelteRules = {
	"svelte/block-lang": [
		"error",
		{
			enforceScriptPresent: true,
			script: "ts",
			style: null,
		},
	],
	"svelte/button-has-type": "error",
	"svelte/derived-has-same-inputs-outputs": "error",
	"svelte/experimental-require-slot-types": "error",
	"svelte/experimental-require-strict-events": "error",
	"svelte/html-self-closing": ["error", "all"],
	"svelte/infinite-reactive-loop": "error",
	"svelte/no-dom-manipulating": "error",
	"svelte/no-dupe-on-directives": "error",
	"svelte/no-dupe-use-directives": "error",
	"svelte/no-immutable-reactive-statements": "error",
	"svelte/no-reactive-functions": "error",
	"svelte/no-reactive-literals": "error",
	"svelte/no-reactive-reassign": "error",
	"svelte/no-store-async": "error",
	"svelte/no-target-blank": "error",
	"svelte/no-useless-mustaches": "error",
	"svelte/prefer-class-directive": "error",
	"svelte/prefer-style-directive": "error",
	"svelte/require-each-key": "error",
	"svelte/require-event-dispatcher-types": "error",
	"svelte/require-optimized-style-attribute": "error",
	"svelte/valid-each-key": "error",
	"svelte/valid-prop-names-in-kit-pages": "error",
};

module.exports = {
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:svelte/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@typescript-eslint/strict",
		"plugin:eslint-comments/recommended",
		"plugin:regexp/recommended",
		"plugin:promise/recommended",
		"plugin:unicorn/recommended",
		"plugin:perfectionist/recommended-natural",
		"prettier",
	],
	overrides: [
		{
			files: ["*.ts", "*.tsx", "*.js", "*.cjs", "*.mjs"],
			parserOptions: {
				project: true,
				tsconfigRootDir: __dirname,
			},
		},
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				project: true,
				tsconfigRootDir: __dirname,
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2_020,
		extraFileExtensions: [".svelte"],
		sourceType: "module",
	},
	plugins: [
		"@typescript-eslint",
		"canonical",
		"eslint-comments",
		"import",
		"promise",
		"regexp",
		"unicorn",
		"prefer-arrow-functions",
		"fp",
		"perfectionist",
	],
	root: true,
	rules: {
		...builtinRules,
		...preferArrowFunctionsRules,
		...typescriptRules,
		...canonicalRules,
		...eslintCommentsRules,
		...fpRules,
		...importRules,
		...unicornRules,
		...perfectionistRules,
		...svelteRules,
	},
	settings: {
		"import/extensions": [".ts", ".svelte"],
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".svelte"],
		},
		"import/resolver": {
			typescript: {
				extensions: [".ts", ".svelte"],
			},
		},
	},
};
