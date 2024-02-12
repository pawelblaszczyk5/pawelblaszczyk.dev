import type { Check } from "commonality";

import { diff, json } from "commonality";

export const hasDependency = ({
	name,
	type,
	version,
}: {
	name: string;
	type: "development" | "production";
	version: string;
}) => {
	const key = type === "development" ? "devDependencies" : "dependencies";

	return {
		level: "error",
		message: `Package must have a "${name}" dependency with "${version}" version inside of "${key}" field in package.json`,
		validate: async ctx => {
			const packageJson = await json(ctx.package.path, "package.json").get();

			if (!packageJson)
				return {
					message: "package.json does not exist",
					path: "package.json",
				};

			const dependencies = packageJson[key] as Record<string, string> | undefined;

			if (!dependencies || dependencies[name] !== version)
				return {
					message: `package.json doesn't have a "${name}" dependency with "${version}" in "${key}" field"`,
					path: "package.json",
					suggestion: diff({ [key]: dependencies }, { [key]: { ...dependencies, [name]: version } }) ?? "",
				};

			return true;
		},
	} satisfies Check;
};
