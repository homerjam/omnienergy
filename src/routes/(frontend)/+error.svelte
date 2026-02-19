<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Button from '$lib/components/Button.svelte';

	const message = $derived(page.error?.message ?? 'Something went wrong');
	const status = $derived(page.status ?? 500);
	const isNotFound = $derived(status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? 'Page not found' : 'Error'} – Omni Energy Therapy</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />

	<main class="flex flex-1 flex-col items-center justify-center px-4 py-24">
		<p class="mb-2 type-heading">{status}</p>
		<h1 class="mb-4 type-title">
			{isNotFound ? 'Page not found' : 'Something went wrong'}
		</h1>
		<p class="mb-8 max-w-md text-center type-copy-default">
			{isNotFound ? "The page you're looking for doesn't exist or has been moved." : message}
		</p>
		<Button kind="pill" href="/" class="text-black!">Return home</Button>
	</main>

	<Footer />
</div>
