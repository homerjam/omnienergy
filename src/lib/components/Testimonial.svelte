<script lang="ts">
	import { marked } from 'marked';
	import { fade } from 'svelte/transition';

	let {
		testimonial,
	}: {
		testimonial: {
			_key: string;
			source: string | null;
			text: string | null;
			// date: string | null;
			rating: number | null;
			author: string | null;
			originalUrl: string | null;
		};
	} = $props();
</script>

{#key testimonial._key}
	<div in:fade={{ duration: 1000 }} class="m-auto flex w-fit flex-col gap-4">
		<div class="flex flex-col gap-2">
			<div class="flex gap-1">
				{#each Array(testimonial.rating).fill(null) as rating, index (index)}
					<span class="icon-[iconoir--star-solid]"></span>
				{/each}
			</div>
			<p class="type-copy-small">{testimonial.author} via {testimonial.source}</p>
		</div>
		<div class="line-clamp-6 max-w-lg space-y-2 type-copy-small italic">
			{@html marked.parse(testimonial.text ?? '')}
		</div>
		<a href={testimonial.originalUrl ?? ''} target="_blank" class="type-copy-small underline"
			>Read full review →</a
		>
	</div>
{/key}
