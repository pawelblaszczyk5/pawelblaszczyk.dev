import { $ } from "zx";

export const migrateDatabase = async (url: string, token: string) => {
	process.env["TURSO_URL"] = url;
	process.env["TURSO_AUTH_TOKEN"] = token;

	await $`pnpm --filter=@pawelblaszczyk.dev/database db:migrate`;
};
