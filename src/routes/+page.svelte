<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h1>Hello world from fly.io</h1>
	<h2>Current region: {data.region}</h2>

	{#each data.entries as entry (entry.id)}
		<li style="display: flex; gap: 16px;">
			<span>ID: {entry.id}</span>
			<span>Username: {entry.username}</span>
			<span>Text: {entry.text}</span>
			<span>Region: {entry.region}</span>
		</li>
	{/each}
</main>
