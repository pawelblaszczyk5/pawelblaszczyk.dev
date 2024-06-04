import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

export default tseslint.config(...fixupConfigRules(compat.extends("plugin:drizzle/all")));
