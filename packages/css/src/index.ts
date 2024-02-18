import { sharedTheme } from "@blog/theme";
import { createCss } from "@tokenami/css";

export const css = createCss({ ...sharedTheme, include: [] });

export { createConfig } from "@tokenami/css";
