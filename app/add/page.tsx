import { createId } from "@paralleldrive/cuid2";
import { redirect } from "next/navigation";

import { db, entries } from "~/lib/db";

const AddPage = () => {
	const addEntry = async (data: FormData) => {
		"use server";

		const text = data.get("text") as string;
		const username = data.get("username") as string;

		db()
			.insert(entries)
			.values({
				id: createId(),
				region: process.env["FLY_REGION"] ?? "loc",
				text,
				username,
			})
			.run();

		redirect("/");
	};

	return (
		<form action={addEntry}>
			<label>
				Username
				<input minLength={1} name="username" required type="text" />
			</label>
			<label>
				Text
				<input minLength={1} name="text" required type="text" />
			</label>
			<button>Submit</button>
		</form>
	);
};

export default AddPage;
