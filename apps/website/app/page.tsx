import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { Suspense } from "react";

import { css } from "@pawelblaszczyk.dev/css";
import { database } from "@pawelblaszczyk.dev/database";
import { entries } from "@pawelblaszczyk.dev/database/schema";

const sleep = async (time: number) => {
	await new Promise<void>(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
};

const getRandomNumber = unstable_cache(
	async () => {
		await sleep(1_000);

		return Math.random();
	},
	["random-number"],
	{
		tags: ["random-number"],
	},
);

const List = async () => {
	const data = await database("read").select().from(entries);

	await sleep(1_000);

	return (
		<div>
			{data.map(row => (
				<p key={row.id}>
					{row.id} - {row.text}
				</p>
			))}
		</div>
	);
};

const HomePage = () => (
	<>
		<form
			action={async formData => {
				"use server";

				const entry = formData.get("text") as string;

				await database("write")
					.insert(entries)
					.values({ id: `${Date.now()}`, text: entry });

				revalidatePath("/");
			}}
		>
			<input name="text" type="text" />
			<span style={css({ "--color": "var(---, blue)" })}>{getRandomNumber()}</span>
			<button
				formAction={async () => {
					"use server";

					await sleep(100);

					revalidateTag("random-number");
				}}
				type="submit"
			>
				Reset random number
			</button>
			<button type="submit">Submit</button>
		</form>
		<Suspense fallback={<p>Loading list</p>}>
			<List />
		</Suspense>
	</>
);

export default HomePage;
