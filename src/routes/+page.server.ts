import { env } from "$env/dynamic/private";
import { getDatabase } from "$lib/database/instance";
import { entries } from "$lib/database/schema";

import type { PageServerLoad } from "./$types";

export const prerender = false;

export const load = (() => {
	const result = getDatabase().select().from(entries).all();

	return {
		entries: result,
		region: env.FLY_REGION,
	};
}) satisfies PageServerLoad;
