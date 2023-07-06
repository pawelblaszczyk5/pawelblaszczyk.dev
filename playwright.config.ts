import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	fullyParallel: true,
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "Mobile Safari",
			use: { ...devices["iPhone 12"] },
		},
	],
	testDir: "./tests",
	webServer: {
		command: "pnpm build && pnpm preview",
		port: 4_173,
		reuseExistingServer: !process.env["CI"],
	},
	...(process.env["CI"]
		? {
				forbidOnly: true,
				workers: 1,
		  }
		: {}),
});
