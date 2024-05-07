import type { ReactNode } from "react";

import { css } from "@pawelblaszczyk.dev/css";

export const Button = ({ children }: { children: ReactNode }) => (
	<button style={css({ backgroundColor: "red", on: $ => [$("hover", { backgroundColor: "yellowgreen" })] })}>
		{children}
	</button>
);
