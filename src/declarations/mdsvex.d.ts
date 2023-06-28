declare module "*.svx" {
	const component: import("svelte").ComponentType<import("svelte").SvelteComponent<import("type-fest").EmptyObject>>;

	const metadata: Record<string, unknown>;

	export { metadata };

	export default component;
}
