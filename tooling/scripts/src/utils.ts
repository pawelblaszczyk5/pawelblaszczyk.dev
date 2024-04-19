import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { $ } from "zx";

const PRODUCTION_ENVIRONMENT = "production";

const BASE = "pawelblaszczyk-dev";
const WEBSITE_SUFFIX = "website";
const DATABASE_SUFFIX = "database";

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

export const IS_PRODUCTION = ENVIRONMENT === PRODUCTION_ENVIRONMENT;

export const PRIMARY_REGION = "waw";

export const WEBSITE_APP_NAME = `${BASE}-${ENVIRONMENT}-${WEBSITE_SUFFIX}`;
export const DATABASE_NAME = `${BASE}-${ENVIRONMENT}-${DATABASE_SUFFIX}`;
export const PRODUCTION_DATABASE_NAME = `${BASE}-${PRODUCTION_ENVIRONMENT}-${DATABASE_SUFFIX}`;

export const setupCwd = () => {
	$.cwd = join(dirname(fileURLToPath(import.meta.url)), "../../../");
};
