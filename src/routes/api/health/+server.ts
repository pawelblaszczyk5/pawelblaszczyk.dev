import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET = (() => json(null, { status: 200 })) satisfies RequestHandler;
