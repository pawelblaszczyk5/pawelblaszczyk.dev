import type { Check } from "commonality";
import { json, diff } from "commonality";

export default {
	message: 'Package must have a "typecheck" script in package.json',
	validate: async ctx => {
		const packageJson = await json(ctx.package.path, "package.json").get();

		if (!packageJson) {
			return {
				message: "package.json does not exist",
				path: "package.json",
			};
		}

		const scripts = packageJson.scripts as Record<string, unknown>;

		if (!scripts.typecheck) {
			return {
				message: 'package.json does not have a "typecheck" script',
				path: "package.json",
				suggestion: diff({ scripts: scripts }, { scripts: { ...scripts, typecheck: 'Typecheck command e.g. "tsc"' } }),
			};
		}

		return true;
	},
	level: "error",
} satisfies Check;
