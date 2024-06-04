import type { ReactNode } from "react";

import { css } from "@pawelblaszczyk.dev/css";

export const Button = ({ children, type }: Readonly<{ children: ReactNode; type: "button" | "reset" | "submit" }>) => (
	<button style={css({ backgroundColor: "red", on: $ => [$("hover", { backgroundColor: "blue" })] })} type={type}>
		{children}
	</button>
);
