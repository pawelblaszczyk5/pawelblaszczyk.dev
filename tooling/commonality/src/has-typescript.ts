import { hasDependency } from "#src/utils/has-dependency.ts";

const hasTypescript = hasDependency({ name: "typescript", type: "development", version: "5.4.0-beta" });

export default hasTypescript;
