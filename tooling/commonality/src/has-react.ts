import { hasDependency } from "#src/utils/has-dependency.ts";

const hasReact = hasDependency({ name: "react", type: "production", version: "18.3.0-canary-2cd19ed1d-20240207" });

export default hasReact;
