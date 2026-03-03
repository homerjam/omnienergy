<script lang="ts">
	import { resolve } from '$app/paths';
	import { imageUrl } from '$lib/helpers';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Library | Omni Energy Therapy</title>
</svelte:head>

<Header />

<main class="mx-auto px-4 py-24 lg:px-12">
	<h1 class="mb-32 text-center type-heading">Library</h1>

	<div class="grid grid-cols-2 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
		{#each data.library as article, index (index)}
			<a href={resolve('/(frontend)/library/[slug]', { slug: article.slug ?? '' })}>
				<div class="space-y-4">
					{#if article?.coverImage}
						<figure class="mb-8 overflow-hidden rounded-2xl">
							<img
								class="w-full object-cover"
								src={imageUrl(article.coverImage, { width: 600, quality: 80, sharpen: 1 })}
								alt={article.coverImage.alt}
							/>
						</figure>
					{/if}
					<h2 class="mb-2 type-title">{article.title}</h2>
				</div>
			</a>
		{/each}
	</div>
</main>

<div id="library" class="flex items-center justify-center pt-28 pb-6">
	<h2 class="type-heading">
		Back to <a href="/" class="underline">home</a>
	</h2>
</div>

<Footer />
