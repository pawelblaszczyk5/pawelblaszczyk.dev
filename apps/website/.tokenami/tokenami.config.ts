import { createConfig } from "@blog/css";
import { sharedTheme } from "@blog/theme";

export default createConfig({
	include: ["./app/**/*.{ts,tsx}", "node_modules/@blog/design-system/dist/tokenami.buildinfo.css"],
	...sharedTheme,
});
