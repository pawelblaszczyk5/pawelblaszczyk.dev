import type { Check } from "commonality";
import { json, diff } from "commonality";

export default {
	message: 'Package must have a "description" field in package.json',
	validate: async ctx => {
		const packageJson = await json(ctx.package.path, "package.json").get();

		if (!packageJson) {
			return {
				message: "package.json does not exist",
				path: "package.json",
			};
		}

		if (typeof packageJson.description !== "string" || packageJson.description.length === 0) {
			return {
				message: 'package.json does not have a "description" field with non-empty value',
				path: "package.json",
				suggestion: diff({ description: packageJson.description }, { description: "Some descriptive description" }),
			};
		}

		return true;
	},
	level: "warning",
} satisfies Check;
