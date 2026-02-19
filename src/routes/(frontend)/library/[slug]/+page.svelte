<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { imageUrl, portableTextToHtml } from '$lib/helpers';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.article?.seo?.title ?? data.article?.title ?? 'Article'} | Omni Energy Therapy</title
	>
	{#if data.article?.seo?.description}
		<meta name="description" content={data.article.seo.description} />
	{/if}
</svelte:head>

<Header />

<main class="mx-auto max-w-3xl px-4 py-16 lg:px-8">
	<h2 class="mb-2 type-heading">{data.article?.title ?? 'Article'}</h2>

	<!-- {#if data.article?.date}
		<time class="mb-6 block type-copy-small text-black/60" datetime={data.article.date}>
			{new Date(data.article.date).toLocaleDateString('en-GB', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})}
		</time>
	{/if} -->

	{#if data.article?.coverImage}
		<figure class="mb-8 overflow-hidden rounded-2xl">
			<img
				class="w-full object-cover"
				src={imageUrl(data.article.coverImage, { width: 1200, quality: 80, sharpen: 1 })}
				alt={data.article.coverImage.alt}
			/>
		</figure>
	{/if}

	<div
		class="prose prose-sm max-w-none text-black! marker:text-black lg:prose-base prose-headings:mt-12"
	>
		{@html portableTextToHtml(
			data.article?.text as import('@portabletext/types').PortableTextBlock[] | null | undefined,
			{ imageWidth: 1200, imageQuality: 80 }
		)}
	</div>
</main>

<Footer />
