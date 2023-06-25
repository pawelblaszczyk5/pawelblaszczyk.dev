import { db, entries } from "~/lib/db";

export const dynamic = "force-dynamic";

const HomePage = () => {
	const result = db().select().from(entries).all();

	return (
		<main>
			<h1>Hello world from fly.io</h1>
			<h2>Current region: {process.env["FLY_REGION"] ?? "loc"}</h2>
			{result.map(result => (
				<li key={result.id} style={{ display: "flex", gap: 16 }}>
					<span>ID: {result.id}</span>
					<span>Username: {result.username}</span>
					<span>Text: {result.text}</span>
					<span>Region: {result.region}</span>
				</li>
			))}
		</main>
	);
};

export default HomePage;
