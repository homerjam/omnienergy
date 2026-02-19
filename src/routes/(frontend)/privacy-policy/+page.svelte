<script lang="ts">
	// import { portableTextToHtml } from '$lib/helpers';
	import { toHTML } from '@portabletext/to-html';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title
		>{data.page?.seo?.title ?? data.page?.title ?? 'Privacy Policy'} | Omni Energy Therapy</title
	>
	{#if data.page?.seo?.description}
		<meta name="description" content={data.page.seo.description} />
	{/if}
</svelte:head>

<Header />

<main class="mx-auto max-w-3xl px-4 py-16 lg:px-8">
	<h1 class="mb-4 type-heading">{data.page?.title ?? 'Privacy Policy'}</h1>

	<div class="prose max-w-none type-copy-default text-black!">
		{@html toHTML(data.page?.content ?? [])}
	</div>
</main>

<Footer />
