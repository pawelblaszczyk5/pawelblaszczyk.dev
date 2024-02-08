import type { Check } from "commonality";
import { json, diff } from "commonality";

export default {
	message: 'Package must have a "build" script in package.json',
	validate: async ctx => {
		const packageJson = await json(ctx.package.path, "package.json").get();

		if (!packageJson) {
			return {
				message: "package.json does not exist",
				path: "package.json",
			};
		}

		const scripts = packageJson.scripts as Record<string, unknown>;

		if (!scripts.build) {
			return {
				message: 'package.json does not have a "build" script',
				path: "package.json",
				suggestion: diff({ scripts: scripts }, { scripts: { ...scripts, build: "Build command" } }),
			};
		}

		return true;
	},
	level: "error",
} satisfies Check;
