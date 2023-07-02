import type { Meta, StoryObj } from "@storybook/svelte";

import Button from "~/lib/components/button.svelte";

const meta = {
	argTypes: {
		label: {
			control: {
				type: "text",
			},
		},
	},
	component: Button,
	title: "Button",
} satisfies Meta<Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Hello world",
	},
};
