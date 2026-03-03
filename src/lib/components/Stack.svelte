<script lang="ts">
	import { random } from 'lodash-es';
	import type { Snippet } from 'svelte';
	import StackItem from '$lib/components/StackItem.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import type { Tween } from 'svelte/motion';

	let {
		items,
		class: className,
		children,
	}: {
		items: unknown[];
		class?: string;
		children: Snippet<[{ item: unknown; index: number }]>;
	} = $props();

	let isDragging = $state(false);
	let isDismissing = $state(false);

	// let currentIndex = $state(0);

	const stackItems = $state<StackItem[]>([]);

	let transformMap: Map<unknown, { x: number; y: number; rotate: number }> = new SvelteMap();
	let tweenMap: Map<
		unknown,
		Tween<{
			x: number;
			y: number;
			rotate: number;
			scale: number;
			brightness: number;
		}>
	> = new SvelteMap();

	function updateTransformMap() {
		items.forEach((item) => {
			let key = (item as { id: unknown }).id || item;
			transformMap.set(key, {
				x: transformMap.get(key)?.x || random(-5, 5, false),
				y: transformMap.get(key)?.y || random(-5, 5, false),
				rotate: transformMap.get(key)?.rotate || random(-5, 2, false),
			});
		});
	}

	updateTransformMap();

	// $effect(() => {
	// 	updateTransformMap();
	// });

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
		let key = (items[0] as { id: unknown }).id || items[0];

		await tweenMap.get(key)?.set(
			{
				x: random(150, 300, false),
				y: random(-20, 20, false),
				rotate: random(-5, 5, false),
				scale: 1,
				brightness: 1,
			},
			{ duration: 300 }
		);

		stackItems[0]?.actions.dismiss?.();
	}
</script>

<div class={['relative', isDragging || isDismissing ? 'z-1000' : 'z-0', className]}>
	{#each items as item, index ((item as { id: unknown }).id || item)}
		<StackItem
			bind:this={stackItems[index]}
			index={getIndex(index)}
			{item}
			{transformMap}
			{tweenMap}
			onDismissStart={handleDismissStart}
			onDismissEnd={handleDismissEnd}
			onDragStart={() => (isDragging = true)}
			onDragEnd={() => (isDragging = false)}
			{children}
		></StackItem>
	{/each}
</div>
