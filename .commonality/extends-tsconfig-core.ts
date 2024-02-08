import { Check } from "commonality";
import { hasJsonFile } from "commonality-checks-recommended";

export default {
	...hasJsonFile("tsconfig.json", {
		extends: ["@blog/typescript-config/core"],
	}),
	level: "error",
} satisfies Check;
