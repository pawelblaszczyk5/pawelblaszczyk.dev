import { env } from "$env/dynamic/private";
import { db } from "$lib/database/instance";
import { entries } from "$lib/database/schema";
import { createId } from "@paralleldrive/cuid2";
import { redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const text = formData.get("text") as string;
		const username = formData.get("username") as string;

		db.insert(entries)
			.values({
				id: createId(),
				region: env.FLY_REGION,
				text,
				username,
			})
			.run();

		throw redirect(303, "/");
	},
} satisfies Actions;
