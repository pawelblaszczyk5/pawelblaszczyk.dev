import type { CSSProperties } from "react";

export type CustomCSSProperties = {
	backgroundColor?: "blue" | "red" | undefined;
	color?: "blue" | "red" | undefined;
	display?: CSSProperties["display"];
	gap?: CSSProperties["display"];
	isolation?: CSSProperties["isolation"];
};
