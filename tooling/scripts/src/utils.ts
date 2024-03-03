import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { $, retry } from "zx";

const BASE = "personal-site";
const SQLITE_PROXY_SUFFIX = "sql-proxy";
const REDIS_DATABASE_SUFFIX = "redis";
const SITE_SUFFIX = "site";
const REDIS_DATABASE_PRIVATE_URL_REGEX = /redis:\/\/.*$/mu;
const CLONING_MAX_RETRY_COUNT = 3;

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
export const SECONDARY_REGIONS = ["sjc", "nrt"];

export const getSqliteProxyAppName = () => `${BASE}-${ENVIRONMENT}-${SQLITE_PROXY_SUFFIX}`;

export const getSqliteProxyInternalUrl = () => `http://${getSqliteProxyAppName()}.flycast`;

export const getRedisDatabaseName = () => `${BASE}-${ENVIRONMENT}-${REDIS_DATABASE_SUFFIX}`;

export const getSiteAppName = () => `${BASE}-${ENVIRONMENT}-${SITE_SUFFIX}`;

export const setupCwd = () => {
	$.cwd = join(dirname(fileURLToPath(import.meta.url)), "../../../");
};

export const getRedisDatabasePrivateUrl = async () => {
	const { stdout } = await $`flyctl redis status ${getRedisDatabaseName()}`.quiet();

	const privateUrl = stdout.match(REDIS_DATABASE_PRIVATE_URL_REGEX)?.[0].trim();

	if (!privateUrl) throw new Error("Unexpected missing Redis database private URL after creation");

	return privateUrl;
};

export const getCurrentAppMachineId = async () => {
	const { stdout } = await $`flyctl machine list --json`.quiet();
	const [machine] = JSON.parse(stdout) as Array<{ id: string }>;

	if (!machine) throw new Error("Unexpected missing machine after creation");

	return machine.id;
};

export const cloneMachineAcrossSecondaryRegions = async (machineId: string) =>
	await Promise.all(
		SECONDARY_REGIONS.map(async region =>
			retry(CLONING_MAX_RETRY_COUNT, async () => $`flyctl machine clone ${machineId} --region=${region}`),
		),
	);
