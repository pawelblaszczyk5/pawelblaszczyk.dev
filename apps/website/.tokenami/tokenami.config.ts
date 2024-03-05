import { createConfig } from "@pawelblaszczyk.dev/css";
import { sharedTheme } from "@pawelblaszczyk.dev/theme";

export default createConfig({
	include: ["./app/**/*.{ts,tsx}", "node_modules/@pawelblaszczyk.dev/design-system/dist/tokenami.buildinfo.css"],
	...sharedTheme,
});
