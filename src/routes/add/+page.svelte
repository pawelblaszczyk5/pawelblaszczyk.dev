<script lang="ts" strictEvents>
	import { css } from "styled-system/css";
	import { superForm } from "sveltekit-superforms/client";

	import type { PageData } from "./$types";

	export let data: PageData;

	const { constraints, enhance, errors, form } = superForm(data.form);
</script>

<form method="POST" novalidate use:enhance>
	<label>
		Username
		<input
			aria-invalid={$errors.username ? "true" : undefined}
			name="username"
			bind:value={$form.username}
			type="text"
			{...$constraints.username}
		/>
		{#if $errors.username}
			<span class={css({ color: "red.500" })}>{$errors.username}</span>
		{/if}
	</label>
	<label>
		Text
		<input
			aria-invalid={$errors.text ? "true" : undefined}
			bind:value={$form.text}
			name="text"
			type="text"
			{...$constraints.text}
		/>
		{#if $errors.text}
			<span class={css({ color: "red.500" })}>{$errors.text}</span>
		{/if}
	</label>
	<button type="submit">Submit</button>
</form>
