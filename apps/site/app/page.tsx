import { getCurrentUser } from "@blog/data/auth";

const HomePage = () => <h1>Hello world {getCurrentUser()}</h1>;

export default HomePage;
