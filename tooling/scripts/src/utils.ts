import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { $ } from "zx";

const BASE = "pawelblaszczyk-dev";
const WEBSITE_SUFFIX = "website";

const {
	values: { environment: ENVIRONMENT },
} = parseArgs({
	allowPositionals: false,
	options: {
		environment: {
			short: "e",
			type: "string",
		},
	},
	strict: true,
});

if (!ENVIRONMENT) throw new Error("Pass the name of environment you wish to create");

export const PRIMARY_REGION = "waw";

export const getWebsiteAppName = () => `${BASE}-${ENVIRONMENT}-${WEBSITE_SUFFIX}`;

export const setupCwd = () => {
	$.cwd = join(dirname(fileURLToPath(import.meta.url)), "../../../");
};
