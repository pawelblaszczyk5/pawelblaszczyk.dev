import type { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
	failOnDifference: true,
	generateOnly: true,
	storybookShots: {
		storybookUrl: "./storybook-static",
	},
};
