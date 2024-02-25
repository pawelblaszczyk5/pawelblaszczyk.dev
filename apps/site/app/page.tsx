import { css } from "@blog/css";
import { getCurrentUser } from "@blog/data/auth";
import { Button } from "@blog/design-system/button";

const HomePage = () => (
	<h1 style={css({ "--hover_color": "var(---, blue)" })}>
		Hello world {getCurrentUser()}
		<Button />
	</h1>
);

export default HomePage;
