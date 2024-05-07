import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { css } from "@pawelblaszczyk.dev/css";
import { database } from "@pawelblaszczyk.dev/database";
import { entries } from "@pawelblaszczyk.dev/database/schema";

const getEntries = unstable_cache(async () => await database.select().from(entries), ["entries"], {
	tags: ["entries"],
});

const User = () => {
	const currentUser = cookies().get("username")?.value;

	return (
		<div>
			<p>{currentUser ? `Currently logged in as: ${currentUser}` : "Currently anonymous"}</p>
			<form
				action={async formData => {
					"use server";

					const username = formData.get("username") as string;

					cookies().set({ name: "username", value: username });
				}}
			>
				<input name="username" />
				<button type="submit">Change username</button>
			</form>
		</div>
	);
};

const Entries = async () => {
	const data = await getEntries();

	return (
		<>
			<form
				action={async formData => {
					"use server";

					const entry = formData.get("text") as string;

					await database.insert(entries).values({ id: `${Date.now()}`, text: entry });

					revalidateTag("entries");
				}}
			>
				<input name="text" type="text" />
				<button type="submit">Submit</button>
			</form>
			<div>
				{data.map(row => (
					<p key={row.id}>{`${row.id} - ${row.text}`}</p>
				))}
			</div>
		</>
	);
};

const HomePage = () => (
	<div>
		<p style={css({ "--color": "var(---, red)" })}>Hello world</p>
		<Suspense fallback={<p>Loading entries data...</p>}>
			<Entries />
		</Suspense>
		<Suspense fallback={<p>Loading user data...</p>}>
			<User />
		</Suspense>
	</div>
);

export default HomePage;
