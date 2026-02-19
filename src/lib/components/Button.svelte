<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		kind = 'default',
		href,
		target = '_self',
		disabled = false,
		loading = false,
		onclick,
		class: className,
		style,
		children,
		iconAfter,
	}: {
		kind?:
			| 'default'
			| 'small'
			| 'large'
			| 'round'
			| 'round-small'
			| 'round-large'
			| 'pill'
			| 'pill-small'
			| 'pill-large';
		href?: string;
		target?: string;
		disabled?: boolean;
		loading?: boolean;
		onclick?: (() => void) | undefined;
		class?: string | Array<string | boolean>;
		style?: string;
		children: Snippet;
		iconAfter?: Snippet;
	} = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	{target}
	{disabled}
	{onclick}
	role="button"
	tabindex={disabled ? -1 : 0}
	class={[
		'cursor-pointer overflow-hidden whitespace-nowrap',
		'disabled:cursor-not-allowed disabled:opacity-50',
		'flex items-center justify-center',
		'active:scale-99',
		kind === 'small' && 'h-7 rounded-lg bg-white p-2 text-black',
		kind === 'default' && 'h-9 rounded-lg bg-white p-2 text-black',
		kind === 'large' && 'h-11 rounded-lg bg-white p-2 text-black',
		kind === 'round-small' && 'h-7 w-7 rounded-2xl bg-white text-black',
		kind === 'round' && 'h-9 w-9 rounded-3xl bg-white text-black',
		kind === 'round-large' && 'h-11 w-11 rounded-3xl bg-white text-black',
		kind === 'pill-small' && 'h-7 rounded-lg bg-white px-7 text-black',
		kind === 'pill' &&
			'h-8 rounded-3xl border px-2 text-lg text-current md:h-11 md:px-5 md:text-2xl',
		kind === 'pill-large' && 'h-11 rounded-3xl bg-white px-11 text-black',
		className || '',
	]}
	{style}
>
	{#if !loading}
		<div class="flex w-full items-center justify-center">
			{@render children?.()}
		</div>
		{#if iconAfter}
			<div
				class="bg-offwhite ml-auto flex aspect-square h-full items-center justify-center rounded-lg p-1"
			>
				{@render iconAfter?.()}
			</div>
		{/if}
	{/if}
	{#if loading}
		<span class="icon-[vaadin--spinner-arc] animate-spin align-text-top"></span>
	{/if}
</svelte:element>
