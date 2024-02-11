import type { Check } from "commonality";

import { diff, json } from "commonality";

export const hasScript = (name: string) =>
	({
		level: "error",
		message: `Package must have a "${name}" script in package.json`,
		validate: async ctx => {
			const packageJson = await json(ctx.package.path, "package.json").get();

			if (!packageJson)
				return {
					message: "package.json does not exist",
					path: "package.json",
				};

			const scripts = packageJson["scripts"] as Record<string, unknown>;

			if (!scripts[name])
				return {
					message: `package.json doesn't have a "${name}" script`,
					path: "package.json",
					suggestion: diff({ scripts }, { scripts: { ...scripts, [name]: `Your "${name}" command` } }) ?? "",
				};

			return true;
		},
	}) satisfies Check;
