<script lang="ts" strictEvents>
	import Component, { metadata } from "$lib/post.svx";
	import { css } from "styled-system/css";

	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h1 class={css({ color: "violet.700", fontSize: "3xl" })}>Hello world from fly.io</h1>
	<h2>Current region: {data.region}</h2>

	{#each data.entries as entry (entry.id)}
		<li style:display="flex" style:gap="16px">
			<span>ID: {entry.id}</span>
			<span>Username: {entry.username}</span>
			<span>Text: {entry.text}</span>
			<span>Region: {entry.region}</span>
		</li>
	{/each}

	<Component />

	{JSON.stringify(metadata)}
</main>
