import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { css } from "@pawelblaszczyk.dev/css";
import { database } from "@pawelblaszczyk.dev/database";
import { entries } from "@pawelblaszczyk.dev/database/schema";
import { Button } from "@pawelblaszczyk.dev/design-system/button";

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
				<Button type="submit">Change username</Button>
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
				<Button type="submit">Submit</Button>
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
		<p style={css({ color: "blue" })}>Hello world</p>
		<Entries />
		<Suspense fallback={<p>Loading user data...</p>}>
			<User />
		</Suspense>
	</div>
);

export default HomePage;
