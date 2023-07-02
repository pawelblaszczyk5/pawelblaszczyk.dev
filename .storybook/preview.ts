import type { Preview } from "@storybook/svelte";

import "~/app.css";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/iu,
				date: /Date$/u,
			},
		},
	},
};

export default preview;
