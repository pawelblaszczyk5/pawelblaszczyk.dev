import { css } from "@blog/css";
import { getCurrentUser } from "@blog/data/auth";
import { Button } from "@blog/design-system/button";

const HomePage = () => (
	<h1 style={css({ "--color": "var(---, blue)" })}>
		Hello world
		<Button />
		<span>Current user: {getCurrentUser()}</span>
	</h1>
);

export default HomePage;
