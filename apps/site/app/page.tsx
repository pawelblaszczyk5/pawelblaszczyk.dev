import { revalidatePath } from "next/cache";

import { database } from "@blog/database";
import { entries } from "@blog/database/schema";

const HomePage = async () => {
	const data = await database("read").select().from(entries);

	return (
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
				<button type="submit">Submit</button>
			</form>
			<div>
				{data.map(row => (
					<p key={row.id}>
						{row.id} - {row.text}
					</p>
				))}
			</div>
		</>
	);
};

export default HomePage;
