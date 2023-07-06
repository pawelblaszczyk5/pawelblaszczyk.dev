import type { CustomProjectConfig } from "lost-pixel";

export const config = {
	failOnDifference: !process.env["LOST_PIXEL_UPDATE"],
	generateOnly: true,
	storybookShots: {
		storybookUrl: "./storybook-static",
	},
} satisfies CustomProjectConfig;
