import type { CSSProperties } from "react";

export type CustomCSSProperties = {
	backgroundColor?: "red" | "yellowgreen" | undefined;
	color?: "red" | "yellowgreen" | undefined;
	display?: CSSProperties["display"];
	gap?: CSSProperties["display"];
	isolation?: CSSProperties['isolation'];
};
