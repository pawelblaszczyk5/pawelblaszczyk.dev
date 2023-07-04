import type { Meta, StoryObj } from "@storybook/svelte";

import { userEvent, within } from "@storybook/testing-library";

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
		label: "Hello world from Surge",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const button = await canvas.getByRole("button", { name: "Hello world" });

		await userEvent.click(button);
	},
};
