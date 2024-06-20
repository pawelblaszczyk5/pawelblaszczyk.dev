import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import canonical from "eslint-plugin-canonical";
import eslintComments from "eslint-plugin-eslint-comments";
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions";
import { fixupPluginRules, fixupConfigRules } from "@eslint/compat";
import fp from "eslint-plugin-fp";
import importX from "eslint-plugin-import-x";
import gitignore from "eslint-config-flat-gitignore";
import unicorn from "eslint-plugin-unicorn";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
import regexpPlugin from "eslint-plugin-regexp";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const banExtension = extension => {
	const message = `Unexpected use of file extension (.${extension})`;
	const literalAttributeMatcher = `Literal[value=/\\.${extension}$/]`;
	return [
		{
			// import foo from 'bar.js';
			selector: `ImportDeclaration > ${literalAttributeMatcher}.source`,
			message,
		},
		{
			// export { foo } from 'bar.js';
			selector: `ExportNamedDeclaration > ${literalAttributeMatcher}.source`,
			message,
		},
		{
			// export * from 'bar.js';
			selector: `ExportAllDeclaration > ${literalAttributeMatcher}.source`,
			message,
		},
		{
			// const foo = import('bar.js');
			selector: `ImportExpression > ${literalAttributeMatcher}.source`,
			message,
		},
		{
			// type Foo = typeof import('bar.js');
			selector: `TSImportType > TSLiteralType > ${literalAttributeMatcher}`,
			message,
		},
		{
			// const foo = require('foo.js');
			selector: `CallExpression[callee.name = "require"] > ${literalAttributeMatcher}.arguments`,
			message,
		},
	];
};

export default tseslint.config(
	{
		name: "settings",
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
	},
	{
		name: "eslint config file ignore",
		ignores: ["eslint.config.js"],
	},
	gitignore(),
	// builtin rules
	eslint.configs.recommended,
	{
		name: "builtin overrides",
		rules: {
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
				{
					message: "Use #private instead",
					selector: ':matches(PropertyDefinition, MethodDefinition)[accessibility="private"]',
				},
				...banExtension("js"),
				...banExtension("jsx"),
			],
			"no-return-assign": "error",
			"no-self-compare": "error",
			"no-sequences": "error",
			"no-template-curly-in-string": "error",
			"no-undef": "off",
			"no-undef-init": "error",
			"no-underscore-dangle": ["error", { allow: ["_tag"] }],
			"no-unneeded-ternary": "error",
			"no-useless-call": "error",
			"no-useless-computed-key": "error",
			"no-useless-concat": "error",
			"no-var": "error",
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
		},
	},
	// typescript eslint rules
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		name: "typescript-eslint overrides",
		rules: {
			"@typescript-eslint/array-type": ["error", { default: "generic", readonly: "generic" }],
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
			"@typescript-eslint/no-empty-object-type": [
				"error",
				{
					allowInterfaces: "with-single-extends",
				},
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: false,
				},
			],
			"@typescript-eslint/no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							group: ["^.*"],
							message: "Don't use relative imports",
						},
					],
				},
			],
			"@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
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
			"@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
			"@typescript-eslint/require-await": "off",
		},
	},
	{
		name: "canonical",
		plugins: {
			canonical,
		},
		rules: {
			"canonical/filename-no-index": "error",
		},
	},
	...compat.extends("plugin:eslint-comments/recommended"),
	{
		name: "eslint-comments overrides",
		plugins: {
			"eslint-comments": eslintComments,
		},
		rules: {
			"eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
			"eslint-comments/no-unused-disable": "error",
			"eslint-comments/require-description": "error",
		},
	},
	{
		name: "prefer-arrow-functions",
		plugins: {
			"prefer-arrow-functions": fixupPluginRules(preferArrowFunctions),
		},
		rules: {
			"prefer-arrow-functions/prefer-arrow-functions": [
				"error",
				{
					classPropertiesAllowed: true,
					disallowPrototype: true,
					returnStyle: "unchanged",
					singleReturnOnly: false,
				},
			],
		},
	},
	{
		name: "fp",
		plugins: {
			fp,
		},
		rules: {
			"fp/no-arguments": "error",
			"fp/no-class": "error",
			"fp/no-delete": "error",
			"fp/no-loops": "error",
			"fp/no-mutating-assign": "error",
			"fp/no-this": "error",
			"fp/no-valueof-field": "error",
		},
	},
	{
		name: "import-x",
		plugins: {
			"import-x": importX,
		},
		rules: {
			"import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
			"import-x/export": "error",
			"import-x/first": "error",
			"import-x/newline-after-import": "error",
			"import-x/no-cycle": ["error"],
			"import-x/no-deprecated": "warn",
			"import-x/no-duplicates": "error",
			"import-x/no-extraneous-dependencies": "error",
			"import-x/no-mutable-exports": "error",
			"import-x/no-named-as-default": "error",
			"import-x/no-named-as-default-member": "error",
			"import-x/no-default-export": "error",
		},
		settings: {
			"import-x/extensions": [".ts", ".tsx", ".js"],
			"import-x/resolver": {
				typescript: true,
				node: true,
			},
		},
	},
	unicorn.configs["flat/recommended"],
	{
		name: "unicorn overrides",
		rules: {
			"unicorn/consistent-function-scoping": "off",
			"unicorn/expiring-todo-comments": [
				"error",
				{
					allowWarningComments: false,
					terms: ["TODO", "FIXME"],
				},
			],
			"unicorn/import-style": [
				"error",
				{
					extendDefaultStyles: false,
				},
			],
			"unicorn/no-array-for-each": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/no-null": "off",
			"unicorn/no-unsafe-regex": "error",
			"unicorn/no-unused-properties": "error",
			"unicorn/no-useless-undefined": "off",
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
			"unicorn/prevent-abbreviations": [
				"error",
				{
					allowList: {
						ctx: true,
						props: true,
						dir: true,
					},
					checkProperties: true,
					checkShorthandProperties: true,
				},
			],
			"unicorn/require-post-message-target-origin": "error",
			"unicorn/throw-new-error": "off",
			"unicorn/no-array-callback-reference": "off",
		},
	},
	perfectionistNatural,
	{
		name: "perfectionist overrides",
		rules: {
			"perfectionist/sort-imports": [
				"error",
				{
					groups: [
						["builtin-type", "type"],
						["builtin", "external"],
						"monorepo-type",
						"monorepo",
						"internal-type",
						"internal",
						["parent-type", "sibling-type", "index-type"],
						["parent", "sibling", "index"],
						"side-effect",
						"style",
						"object",
						"unknown",
					],
					"internal-pattern": ["\\#**/**"],
					order: "asc",
					type: "natural",
					"custom-groups": {
						value: {
							monorepo: ["@pawelblaszczyk.dev/**"],
						},
						type: {
							monorepo: ["@pawelblaszczyk.dev/**"],
						},
					},
				},
			],
			"perfectionist/sort-jsx-props": [
				"error",
				{
					groups: ["multiline", "unknown", "shorthand"],
					order: "asc",
					type: "natural",
				},
			],
		},
	},
	regexpPlugin.configs["flat/recommended"],
	...fixupConfigRules(compat.extends("plugin:promise/recommended")),
	...fixupConfigRules(compat.extends("plugin:deprecation/recommended")),
);
