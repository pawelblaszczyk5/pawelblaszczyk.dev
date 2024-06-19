const BASE = "pawelblaszczyk-dev";
const WEBSITE_SUFFIX = "website";
const DATABASE_SUFFIX = "database";

export const getDatabaseName = (environment: string) => `${BASE}-${environment}-${DATABASE_SUFFIX}`;
export const getWebsiteName = (environment: string) => `${BASE}-${environment}-${WEBSITE_SUFFIX}`;
