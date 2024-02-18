import { css } from "@blog/css";
import { getCurrentUser } from "@blog/data/auth";

const HomePage = () => <h1 style={css({ "--hover_color": "var(---, red)" })}>Hello world {getCurrentUser()}</h1>;

export default HomePage;
