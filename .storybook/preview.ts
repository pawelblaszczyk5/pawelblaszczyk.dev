import type { Preview } from "@storybook/svelte";

import "~/app.css";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		backgrounds: { disable: true },
		controls: {
			matchers: {
				color: /(background|color)$/iu,
				date: /Date$/u,
			},
		},
		docs: {
			story: {
				autoplay: true,
			},
		},
	},
};

export default preview;
