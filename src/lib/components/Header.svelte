<script lang="ts">
	import Button from './Button.svelte';

	const { class: className }: { class?: string | Array<string | boolean> } = $props();
</script>

<div
	class={[
		'flex w-full items-center justify-between px-4 pt-4 pb-4 lg:px-12 lg:pt-6 lg:pb-6',
		className,
	]}
>
	<a href="/">
		<h1 class="type-title">Omni Energy Therapy</h1>
	</a>

	<div class="flex items-center gap-6">
		<!-- <a href="/library" class="type-title">Library</a> -->
		<Button kind="pill" href="/#contact">Get in touch</Button>
	</div>
</div>
