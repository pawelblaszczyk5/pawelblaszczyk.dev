import { createConfig } from "@pawelblaszczyk.dev/css";
import { sharedTheme } from "@pawelblaszczyk.dev/theme";

export default createConfig({
	include: ["./src/**/*.{ts,tsx}"],
	...sharedTheme,
});
