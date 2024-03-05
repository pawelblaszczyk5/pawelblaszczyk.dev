import { css } from "@pawelblaszczyk.dev/css";

export const Button = () => (
	<button style={css({ "--background-color": "var(---, blue)", "--color": "var(---, white)" })}>Hello world</button>
);
