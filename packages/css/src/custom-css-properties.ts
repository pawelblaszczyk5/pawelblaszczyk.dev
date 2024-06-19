import type { CSSProperties } from "react";

export interface CustomCSSProperties {
	backgroundColor?: "blue" | "red" | undefined;
	color?: "blue" | "red" | undefined;
	display?: CSSProperties["display"];
	gap?: CSSProperties["display"];
	isolation?: CSSProperties["isolation"];
}
