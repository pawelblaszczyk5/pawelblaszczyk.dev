import { createClient } from "@tursodatabase/api";

import { CONFIG } from "@pawelblaszczyk.dev/config/scripts";

export const tursoApi = createClient({
	org: CONFIG.TURSO_ORGANIZATION,
	token: CONFIG.TURSO_TOKEN,
});
