import { expect, test } from "@playwright/test";

test("has heading", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { level: 1, name: "Hello world from fly.io" })).toBeVisible();
});
