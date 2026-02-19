<script lang="ts">
	import Button from './Button.svelte';

	const { class: className }: { class?: string | Array<string | boolean> } = $props();
</script>

<div class={['flex w-full justify-between px-4 pt-4 pb-8 lg:px-12 lg:pt-8 lg:pb-10', className]}>
	<h1 class="text-xl md:text-3xl">Omni Energy Therapy</h1>

	<Button kind="pill">Get in touch</Button>
</div>
