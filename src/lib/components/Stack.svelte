<script lang="ts">
	import { type Snippet } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import StackItem from './StackItem.svelte';

	let {
		items,
		transformMap = new SvelteMap(),
		class: className,
		children,
	}: {
		items: unknown[];
		transformMap?: Map<unknown, { x: number; y: number; rotate: number }>;
		class?: string;
		children: Snippet<[{ item: unknown; index: number }]>;
	} = $props();

	let isDragging = $state(false);
	let isDismissing = $state(false);

	// let currentIndex = $state(0);

	const stackItems = $state<StackItem[]>([]);

	function handleDismissStart() {
		isDismissing = true;

		items = [...items.slice(1), ...items.slice(0, 1)];
		// currentIndex = (currentIndex + 1) % items.length;
	}

	function handleDismissEnd() {
		isDismissing = false;
	}

	function getIndex(index: number) {
		return index;
		// return (((index - currentIndex) % items.length) + items.length) % items.length;
	}

	export async function next() {
		stackItems[0]?.dismiss();
	}
</script>

<div class={['relative', isDragging || isDismissing ? 'z-1000' : 'z-0', className]}>
	{#each items as item, index ((item as { id: unknown }).id || item)}
		<StackItem
			bind:this={stackItems[index]}
			index={getIndex(index)}
			{item}
			{transformMap}
			onDismissStart={handleDismissStart}
			onDismissEnd={handleDismissEnd}
			onDragStart={() => (isDragging = true)}
			onDragEnd={() => (isDragging = false)}
			{children}
		></StackItem>
	{/each}
</div>
