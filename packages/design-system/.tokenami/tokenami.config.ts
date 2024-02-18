import { createConfig } from "@blog/css";
import { sharedTheme } from "@blog/theme";

export default createConfig({
	include: ["./src/**/*.{ts,tsx}"],
	...sharedTheme,
});
