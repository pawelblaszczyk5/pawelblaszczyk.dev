import { env } from "$env/dynamic/private";
import { getDatabase } from "$lib/database/instance";
import { entries } from "$lib/database/schema";
import { createId } from "@paralleldrive/cuid2";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

import type { Actions, PageServerLoad } from "./$types";

const addFormSchema = z.object({
	text: z.string().trim().nonempty(),
	username: z.string().trim().nonempty(),
});

export const load = (async () => {
	const form = await superValidate(addFormSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, addFormSchema);

		if (!form.valid) return fail(400, { form });

		getDatabase()
			.insert(entries)
			.values({
				id: createId(),
				region: env.FLY_REGION,
				text: form.data.text,
				username: form.data.username,
			})
			.run();

		throw redirect(303, "/");
	},
} satisfies Actions;
